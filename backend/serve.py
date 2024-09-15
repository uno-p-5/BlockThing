import uvicorn

PORT = 8080

if __name__ == "__main__":
    print(f"[server]: Server is running at http://0.0.0.0:{PORT}")
    uvicorn.run("app:app", host="0.0.0.0", port=PORT, reload=True)