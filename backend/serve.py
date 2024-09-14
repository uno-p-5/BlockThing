import uvicorn

PORT = 8080

if __name__ == "__main__":
    print(f"[server]: Server is running at http://localhost:{PORT}")
    uvicorn.run("app:app", port=PORT, reload=True)