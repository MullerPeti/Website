from fastapi import FastAPI
from fastapi.responses import JSONResponse
import httpx
from bs4 import BeautifulSoup
import os
import json

app = FastAPI()

MQL5_SELLER_URL = os.getenv(
    "MQL5_SELLER_URL",
    "https://www.mql5.com/en/users/mullerp04/seller",
)


@app.get("/")
async def read_root():
    return {"status": "success", "message": "FastAPI is running"}


@app.get("/health")
async def health():
    return {"status": "ok"}


async def _fetch_products(filter_str: str):
    """Load products from mql5/products.json and filter by `filter_str` in title.

    The products file is expected at ./mql5/products.json and to contain
    an array of objects with at least `title`, `link`, `image`, and
    optional `widget_link` and `last_updated`.
    """
    products_file = os.path.join(os.path.dirname(__file__), "mql5", "products.json")
    if not os.path.exists(products_file):
        return JSONResponse(status_code=503, content={"error": "products.json missing", "path": products_file})

    try:
        with open(products_file, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "failed to read products.json", "detail": str(e)})

    results = []
    if not isinstance(data, list):
        return JSONResponse(status_code=500, content={"error": "products.json has unexpected format"})

    for p in data:
        title = (p.get("title") or "").strip()
        if not title:
            continue
        if filter_str in title:
            link = p.get("widget_link") or p.get("link")
            image = p.get("image")
            results.append({
                "title": title,
                "link": link,
                "image": image,
                "last_updated": p.get("last_updated"),
            })

    return {"products": results}


@app.get("/mql5/products/MT4")
async def mt4_products():
    """Return list of MT4 products with title, link and image (if available)."""
    return await _fetch_products("MT4")

@app.get("/mql5/products/MT5")
async def mt5_products():
    """Return list of MT5 products with title, link and image (if available)."""
    return await _fetch_products("MT5")

@app.get("/mql5/products/ALL")
async def all_products():
    """Return list of all products with title, link and image (if available)."""
    return await _fetch_products("")



if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000)