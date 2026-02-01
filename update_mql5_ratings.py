import json
import os
import httpx
from bs4 import BeautifulSoup
from pathlib import Path

# products.json lives in the `mql5` folder under the repo root
PRODUCTS_PATH = Path(__file__).parent / "mql5" / "products.json"

async def fetch_rating(url):
    try:
        print(f"Requesting: {url}")
        async with httpx.AsyncClient(follow_redirects=True) as client:
            resp = await client.get(url)
            print(f"HTTP status: {resp.status_code}")
            print(f"Final URL after redirects: {str(resp.url)}")
            resp.raise_for_status()
            soup = BeautifulSoup(resp.text, "html.parser")
            rating_span = soup.find("span", class_="product-rating-value")
            if rating_span:
                print(f"Found rating span: {rating_span}")
                text = rating_span.text.strip()
                if text:
                    try:
                        rating = float(text)
                        print(f"Parsed rating value: {rating}")
                        return rating
                    except Exception as e:
                        print(f"Failed to parse rating value '{text}': {e}")
                        return None
                else:
                    print("Rating span found but text is empty.")
            else:
                print("No <span class='product-rating-value'> found on page.")
    except Exception as e:
        print(f"Error fetching/parsing {url}: {e}")
        return None
    return None

async def update_ratings():
    if not PRODUCTS_PATH.exists():
        print(f"products.json not found at {PRODUCTS_PATH}")
        return
    with open(PRODUCTS_PATH, "r", encoding="utf-8") as f:
        products = json.load(f)
    changed = False
    for product in products:
        reviews_link = product.get("reviews_link")
        title = product.get("title", "(no title)")
        if not reviews_link:
            print(f"Skipping {title}: no reviews_link.")
            continue
        print(f"\n---\nFetching rating for: {title}\nURL: {reviews_link}")
        rating = await fetch_rating(reviews_link)
        if rating is not None:
            if product.get("rating") != rating:
                print(f"Updating {title} rating to {rating}")
                product["rating"] = rating
                changed = True
            else:
                print(f"{title} already has rating {rating}, no update needed.")
        else:
            print(f"No rating found for {title}.")
    if changed:
        with open(PRODUCTS_PATH, "w", encoding="utf-8") as f:
            json.dump(products, f, indent=2, ensure_ascii=False)
        print("products.json updated with new ratings.")
    else:
        print("No ratings updated.")

if __name__ == "__main__":
    import asyncio
    asyncio.run(update_ratings())
