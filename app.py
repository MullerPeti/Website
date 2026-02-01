from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import json

app = FastAPI()

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    """Return products from mql5/products.json, filtered by platform if filter_str is set."""
    products_file = os.path.join(os.path.dirname(__file__), "mql5", "products.json")
    if not os.path.exists(products_file):
        return JSONResponse(status_code=503, content={"error": "products.json missing", "path": products_file})

    try:
        with open(products_file, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "failed to read products.json", "detail": str(e)})

    if not isinstance(data, list):
        return JSONResponse(status_code=500, content={"error": "products.json has unexpected format"})

    if filter_str:
        filtered = [p for p in data if (p.get("platform") or "").strip() == filter_str]
    else:
        filtered = data

    # Ensure all attributes are returned, including rating
    return {"products": filtered}


async def _get_product_by_name(name: str):
    """Return a single product dict from mql5/products.json matching `name`.

    The match attempts a case-insensitive exact title match first, then a
    case-insensitive substring match.
    """
    products_file = os.path.join(os.path.dirname(__file__), "mql5", "products.json")
    if not os.path.exists(products_file):
        return JSONResponse(status_code=503, content={"error": "products.json missing", "path": products_file})

    try:
        with open(products_file, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "failed to read products.json", "detail": str(e)})

    if not isinstance(data, list):
        return JSONResponse(status_code=500, content={"error": "products.json has unexpected format"})

    name_norm = (name or "").strip().lower()
    if not name_norm:
        return JSONResponse(status_code=400, content={"error": "product name cannot be empty"})

    # try exact match first
    for p in data:
        title = (p.get("title") or "").strip()
        if title.lower() == name_norm:
            # If product references a markdown description, load it and return as long_description
            desc_path = p.get("description_path")
            if desc_path:
                md_file = os.path.join(os.path.dirname(__file__), "mql5", desc_path)
                if os.path.exists(md_file):
                    try:
                        with open(md_file, "r", encoding="utf-8") as df:
                            p["long_description"] = df.read()
                    except Exception:
                        # leave existing long_description if read fails
                        pass
            return {"product": p}

    # fallback to substring match
    for p in data:
        title = (p.get("title") or "").strip()
        if name_norm in title.lower():
            desc_path = p.get("description_path")
            if desc_path:
                md_file = os.path.join(os.path.dirname(__file__), "mql5", desc_path)
                if os.path.exists(md_file):
                    try:
                        with open(md_file, "r", encoding="utf-8") as df:
                            p["long_description"] = df.read()
                    except Exception:
                        pass
            return {"product": p}

    return JSONResponse(status_code=404, content={"error": "product not found", "name": name})

async def _fetch_codes(platform: str):
    """Load code publications from ./mql5/codes.json and filter by platform.

    Expects a JSON object with a top-level `publications` list where each
    item contains `title`, `url`, `description`, optional `video`, and
    `platform` (e.g. "MT4" or "MT5").
    """
    codes_file = os.path.join(os.path.dirname(__file__), "mql5", "codes.json")
    if not os.path.exists(codes_file):
        return JSONResponse(status_code=503, content={"error": "codes.json missing", "path": codes_file})

    try:
        with open(codes_file, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "failed to read codes.json", "detail": str(e)})

    if not isinstance(data, dict) or "publications" not in data:
        return JSONResponse(status_code=500, content={"error": "codes.json has unexpected format"})

    publications = data.get("publications") or []
    results = []

    for item in publications:
        title = (item.get("title") or "").strip()
        if not title:
            continue
        item_platform = (item.get("platform") or "").strip()
        if platform == "" or platform == item_platform:
            results.append({
                "title": title,
                "link": item.get("url"),
                "description": item.get("description"),
                "video": item.get("video"),
                "platform": item_platform,
                "category": item.get("category"),
            })

    return {"codes": results}

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

@app.get("/mql5/codes/MT4")
async def mt4_codes():
    """Return list of MT4 codes with title, link and image (if available)."""
    return await _fetch_codes("MT4")

@app.get("/mql5/codes/MT5")
async def mt5_codes():
    """Return list of MT5 codes with title, link and image (if available)."""
    return await _fetch_codes("MT5")

@app.get("/mql5/codes/ALL")
async def all_codes():
    """Return list of all codes with title, link and image (if available)."""
    return await _fetch_codes("")


@app.get("/mql5/product/{product_name}")
async def product_by_name(product_name: str):
    """Return a single product by its title (case-insensitive exact or substring match).

    Example: `/mql5/product/ManHedger%20MT5`
    """
    return await _get_product_by_name(product_name)


@app.get("/brokers")
async def get_brokers():
    """Return the list of brokers and their properties from mql5/brokers.json.

    This endpoint is intended for navigation (dropdowns, listings).
    """
    brokers_file = os.path.join(os.path.dirname(__file__), "mql5", "brokers.json")
    if not os.path.exists(brokers_file):
        return JSONResponse(status_code=503, content={"error": "brokers.json missing", "path": brokers_file})

    try:
        with open(brokers_file, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "failed to read brokers.json", "detail": str(e)})

    if not isinstance(data, list):
        return JSONResponse(status_code=500, content={"error": "brokers.json has unexpected format"})
    # Attempt to inline markdown descriptions for each broker when available.
    enriched = []
    for b in data:
        b_copy = dict(b)
        desc_path = b_copy.get("description_file") or b_copy.get("description_path")
        if desc_path:
            md_file = os.path.join(os.path.dirname(__file__), "mql5", desc_path)
            if os.path.exists(md_file):
                try:
                    with open(md_file, "r", encoding="utf-8") as df:
                        b_copy["markdown"] = df.read()
                except Exception:
                    pass
        enriched.append(b_copy)

    return {"brokers": enriched}


@app.get("/brokers/{slug}")
async def get_broker(slug: str):
    """Return broker properties for `slug` and include markdown description (if available).

    Example: `/brokers/ic-trading`
    """
    brokers_file = os.path.join(os.path.dirname(__file__), "mql5", "brokers.json")
    if not os.path.exists(brokers_file):
        return JSONResponse(status_code=503, content={"error": "brokers.json missing", "path": brokers_file})

    try:
        with open(brokers_file, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "failed to read brokers.json", "detail": str(e)})

    if not isinstance(data, list):
        return JSONResponse(status_code=500, content={"error": "brokers.json has unexpected format"})

    slug_norm = (slug or "").strip().lower()
    if not slug_norm:
        return JSONResponse(status_code=400, content={"error": "slug cannot be empty"})

    for b in data:
        if (b.get("slug") or "").strip().lower() == slug_norm:
            # attempt to read markdown description file if provided
            desc_path = b.get("description_file") or b.get("description_path")
            if desc_path:
                md_file = os.path.join(os.path.dirname(__file__), "mql5", desc_path)
                if os.path.exists(md_file):
                    try:
                        with open(md_file, "r", encoding="utf-8") as df:
                            b = dict(b)  # copy to avoid mutating original
                            b["markdown"] = df.read()
                    except Exception:
                        # if read fails, return broker without markdown
                        pass
            return {"broker": b}

    return JSONResponse(status_code=404, content={"error": "broker not found", "slug": slug})


@app.get("/mql5/donations")
async def get_donations():
    """Return donation/payment information from mql5/donations.json.

    Example response: {"donations": ...}
    """
    donations_file = os.path.join(os.path.dirname(__file__), "mql5", "donations.json")
    if not os.path.exists(donations_file):
        return JSONResponse(status_code=503, content={"error": "donations.json missing", "path": donations_file})

    try:
        with open(donations_file, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "failed to read donations.json", "detail": str(e)})

    return {"donations": data}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000)