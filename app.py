from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root():
    return {"status": "success", "message": "FastAPI is running"}

@app.get("/health")
async def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)