#!/usr/bin/env python3
"""update_mql5_products.py

Scrape the configured MQL5 seller page and write a JSON file with products.
Writes to ./mql5/products.json by default and applies overrides from
./mql5/widget_overrides.json when present.
"""
import os
import json
import sys
import argparse
from datetime import datetime
import tempfile

import httpx
from bs4 import BeautifulSoup


DEFAULT_URL = os.getenv(
    "MQL5_SELLER_URL",
    "https://www.mql5.com/en/users/mullerp04/seller",
)


def normalize_url(url: str) -> str:
    if not url:
        return url
    if url.startswith("//"):
        return "https:" + url
    return url


def load_overrides(path: str):
    if not os.path.exists(path):
        return {}
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def atomic_write(path: str, data: str):
    dirpath = os.path.dirname(path)
    os.makedirs(dirpath, exist_ok=True)
    fd, tmp_path = tempfile.mkstemp(dir=dirpath, prefix=".tmp-", text=True)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as tmp:
            tmp.write(data)
        os.replace(tmp_path, path)
    finally:
        if os.path.exists(tmp_path):
            try:
                os.remove(tmp_path)
            except Exception:
                pass


def scrape(url: str):
    try:
        resp = httpx.get(url, timeout=15.0)
        resp.raise_for_status()
    except httpx.HTTPError as e:
        print("Error fetching seller page:", e, file=sys.stderr)
        return None

    soup = BeautifulSoup(resp.text, "html.parser")
    products = []

    for item in soup.find_all("span", class_="product-card__title-wrapper"):
        title = item.text.strip()
        if not title:
            continue

        # link: find nearest anchor parent
        link = None
        parent_a = item.find_parent("a", href=True)
        if parent_a:
            link = parent_a.get("href")
            if link and link.startswith("/"):
                link = "https://www.mql5.com" + link

        # image: find image in parent card
        image = None
        card = item.find_parent(class_="product-card") or item.find_parent("div")
        if card:
            img = card.find("img")
            if img and img.get("src"):
                image = normalize_url(img.get("src"))

        products.append({
            "title": title,
            "link": link,
            "image": image,
        })

    return products


def main():
    parser = argparse.ArgumentParser(description="Scrape MQL5 seller page to products.json")
    parser.add_argument("--url", default=DEFAULT_URL, help="Seller page URL")
    parser.add_argument("--out-dir", default="mql5", help="Output directory")
    parser.add_argument("--overrides", default=os.path.join("mql5", "widget_overrides.json"), help="Overrides JSON path")
    args = parser.parse_args()

    products = scrape(args.url)
    if products is None:
        print("Failed to fetch products.")
        sys.exit(2)

    overrides = load_overrides(args.overrides)

    now = datetime.utcnow().isoformat() + "Z"
    enriched = []
    for p in products:
        title_key = p.get("title")
        widget_link = None
        # overrides can map by title exact match
        if isinstance(overrides, dict):
            widget_link = overrides.get(title_key) or overrides.get(p.get("link"))

        enriched.append({
            "title": p.get("title"),
            "link": p.get("link"),
            "image": p.get("image"),
            "widget_link": widget_link,
            "last_updated": now,
        })

    out_path = os.path.join(args.out_dir, "products.json")
    atomic_write(out_path, json.dumps(enriched, ensure_ascii=False, indent=2))
    print(f"Wrote {len(enriched)} products to {out_path}")


if __name__ == "__main__":
    main()
