import string

class PasswordValidator:
    """
    Evaluates password rule compliance using O(n) linear scanning.
    Uses short-circuit generator expressions for optimal performance.
    """
    
    def __init__(self, password: str):
        self.password = password

    def check_rules(self) -> dict:
        """
        Runs rules checks across character classes.
        """
        pwd = self.password
        
        # O(n) short-circuit evaluation
        length_ok = len(pwd) >= 8
        has_upper = any(char.isupper() for char in pwd)
        has_lower = any(char.islower() for char in pwd)
        has_digit = any(char.isdigit() for char in pwd)
        has_symbol = any(char in string.punctuation for char in pwd)
        
        # Calculate policy pass ratio
        passed_rules = sum([length_ok, has_upper, has_lower, has_digit, has_symbol])
        
        return {
            "length": len(pwd),
            "length_ok": length_ok,
            "has_upper": has_upper,
            "has_lower": has_lower,
            "has_digit": has_digit,
            "has_symbol": has_symbol,
            "passed_rules_count": passed_rules,
            "total_rules": 5,
            "is_valid": passed_rules == 5
        }