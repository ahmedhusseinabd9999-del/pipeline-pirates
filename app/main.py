import os
from fastapi import FastAPI

app = FastAPI()

# القيمة دي هتيجي من الـ Kubernetes ConfigMap/Secret
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:pass@localhost/db")

@app.post("/signup")
def signup(user: dict):
    # كود حفظ المستخدم في الداتابيز
    return {"message": "User created successfully"}

@app.post("/signin")
def signin(user: dict):
    # كود التحقق من المستخدم
    return {"token": "fake-jwt-token"}
