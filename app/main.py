import os
from fastapi import FastAPI


app = FastAPI()


# Load database URL from environment or default
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:pass@localhost/db")


@app.post("/signup")
def signup(user: dict):
    # Save user data to the database
    return {"message": "User created successfully"}


@app.post("/signin")
def signin(user: dict):
    # Authenticate user
    return {"token": "fake-jwt-token"}
