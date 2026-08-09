import pytest
from src.core.validator import PasswordValidator
from src.core.entropy import EntropyCalculator

def test_weak_password():
    validator = PasswordValidator("short")
    results = validator.check_rules()
    assert results["is_valid"] is False
    assert results["length_ok"] is False

def test_strong_password_policy():
    validator = PasswordValidator("K9#mP!92xQ$L")
    results = validator.check_rules()
    assert results["is_valid"] is True
    assert results["passed_rules_count"] == 5

def test_entropy_bits_reasonable():
    calc = EntropyCalculator("K9#mP!92xQ$L")
    metrics = calc.get_entropy_metrics()
    assert metrics["entropy_bits"] > 35
    assert metrics["rating"] == "Reasonable"

def test_entropy_bits_strong():
    # Long, highly varied password to hit Strong bracket (>= 60 bits)
    calc = EntropyCalculator("vX9#mP!92xQ$L7@kR4")
    metrics = calc.get_entropy_metrics()
    assert metrics["entropy_bits"] >= 60
    assert metrics["rating"] in ["Strong", "Very Strong"]