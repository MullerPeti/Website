import os
import json
import httpx
from bs4 import BeautifulSoup
from pathlib import Path

# Look for brokers.json inside the repository's `mql5` directory (relative to this script)
BROKERS_PATH = Path(__file__).parent / "mql5" / "brokers.json"


async def fetch_trustpilot_rating(url: str):
    """Fetch Trustpilot page and attempt to extract aggregate rating as float.

    Looks for JSON-LD `aggregateRating` or itemprop `ratingValue` as fallbacks.
    Returns float rating or None.
    """
    if not url:
        return None
    try:
        print(f"Requesting: {url}")
        async with httpx.AsyncClient(follow_redirects=True, timeout=20.0) as client:
            resp = await client.get(url)
            print(f"HTTP status: {resp.status_code} for {url}")
            resp.raise_for_status()
            text = resp.text
            soup = BeautifulSoup(text, "html.parser")

            # 0) Specific Trustpilot score element (site uses a p tag with a generated class)
            # Example: <p class="... styles_trustScore__MVJJI">3.3</p>
            trust_p = soup.find("p", class_=lambda c: c and "styles_trustScore" in c)
            if trust_p and trust_p.text:
                try:
                    return float(trust_p.text.strip())
                except Exception:
                    pass

            # 1) Try JSON-LD with aggregateRating
            for script in soup.find_all("script", type="application/ld+json"):
                try:
                    data = json.loads(script.string or "{}")
                except Exception:
                    continue
                if isinstance(data, dict):
                    agg = data.get("aggregateRating")
                    if isinstance(agg, dict):
                        val = agg.get("ratingValue") or agg.get("rating")
                        if val:
                            try:
                                return float(val)
                            except Exception:
                                pass

            # 2) Look for itemprop ratingValue
            rating_tag = soup.find(attrs={"itemprop": "ratingValue"})
            if rating_tag and rating_tag.text:
                try:
                    return float(rating_tag.text.strip())
                except Exception:
                    pass

            # 3) Try meta tags or common class names (best-effort)
            meta = soup.find("meta", attrs={"name": "rating"}) or soup.find("meta", attrs={"property": "og:rating"})
            if meta and meta.get("content"):
                try:
                    return float(meta.get("content"))
                except Exception:
                    pass

            # 4) Fallback: find numeric text that looks like x.x/5
            text = soup.get_text(separator=" ")
            import re
            m = re.search(r"([0-4]?\.?[0-9](?:\.[0-9])?)\s*/\s*5", text)
            if m:
                try:
                    return float(m.group(1))
                except Exception:
                    pass

    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None
    return None


async def update_broker_ratings():
    if not BROKERS_PATH.exists():
        print(f"brokers.json not found at {BROKERS_PATH}")
        return

    with open(BROKERS_PATH, "r", encoding="utf-8") as f:
        brokers = json.load(f)

    changed = False
    for broker in brokers:
        tp_link = broker.get("trustpilot_link") or broker.get("trustpilot")
        name = broker.get("name") or broker.get("slug")
        if not tp_link:
            print(f"Skipping {name}: no trustpilot_link provided.")
            continue
        print(f"\n---\nFetching Trustpilot rating for: {name}\nURL: {tp_link}")
        rating = await fetch_trustpilot_rating(tp_link)
        if rating is not None:
            # store as trustpilot_review numeric value
            if broker.get("trustpilot_review") != rating:
                print(f"Updating {name} trustpilot_review to {rating}")
                broker["trustpilot_review"] = rating
                changed = True
            else:
                print(f"{name} already has trustpilot_review {rating}, no update.")
        else:
            print(f"No Trustpilot rating found for {name}.")

    if changed:
        with open(BROKERS_PATH, "w", encoding="utf-8") as f:
            json.dump(brokers, f, indent=2, ensure_ascii=False)
        print("brokers.json updated with trustpilot_review values.")
    else:
        print("No broker trustpilot_review values updated.")


if __name__ == "__main__":
    import asyncio
    asyncio.run(update_broker_ratings())
