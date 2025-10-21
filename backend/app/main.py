from fastapi import FastAPI
from app.routers import damage

app = FastAPI(title="Car Damage Evaluation API")

app.include_router(damage.router)

@app.get("/")
def root():
    return {"message": "API работает!"}