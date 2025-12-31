from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy", "version": "1.0.0"}

def test_signup():
    response = client.post("/signup", json={"username": "pirate", "password": "123"})
    assert response.status_code == 200
