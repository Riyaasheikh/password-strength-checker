from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.core.validator import PasswordValidator
from src.core.entropy import EntropyCalculator
from src.services.pwned_service import BreachChecker

app = FastAPI(title="Password Security Analyzer API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PasswordRequest(BaseModel):
    password: str

@app.post("/api/analyze")
def analyze_password(req: PasswordRequest):
    password = req.password
    
    if not password:
        return {
            "policy": {
                "length_ok": False, "has_upper": False, "has_lower": False, 
                "has_digit": False, "has_symbol": False, "total_length": 0
            },
            "entropy": {"entropy_bits": 0, "pool_size": 0, "rating": "Very Weak"},
            "breach": {"is_breached": False, "breach_count": 0, "error": None}
        }

    validator = PasswordValidator(password)
    entropy_calc = EntropyCalculator(password)
    breach_checker = BreachChecker(password)

    policy = validator.check_rules()
    entropy = entropy_calc.get_entropy_metrics()
    breach = breach_checker.check_pwned_status()

    return {
        "policy": policy,
        "entropy": entropy,
        "breach": breach
    }