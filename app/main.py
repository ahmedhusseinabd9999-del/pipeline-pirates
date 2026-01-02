import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Load database URL from environment or default
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:pass@localhost/db")

# ======= CORS Middleware =======
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # أو ضع عنوان الفرونتند لو عايز تحصره
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ======= Health & Version Endpoints =======
@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/version")
def version():
    return {"version": "1.0.0"}

# ======= Auth Endpoints =======
@app.post("/signup")
def signup(user: dict):
    # هنا ممكن تضيف حفظ البيانات في الـ DB
    return {"message": "User created successfully", "user": user}

@app.post("/signin")
def signin(user: dict):
    # هنا ممكن تضيف التحقق من بيانات المستخدم
    return {"token": "fake-jwt-token"}
