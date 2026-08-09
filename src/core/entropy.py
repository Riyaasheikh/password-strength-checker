import math
from collections import Counter

class EntropyCalculator:
    """
    Calculates Shannon Entropy and character set pool size for a given password.
    """

    def __init__(self, password: str):
        self.password = password

    def calculate_pool_size(self) -> int:
        """
        Determines the character space size based on character classes present.
        Supports standard ASCII ranges and Unicode character sets.
        """
        pwd = self.password
        pool_size = 0

        if any(c.islower() for c in pwd):
            pool_size += 26
        if any(c.isupper() for c in pwd):
            pool_size += 26
        if any(c.isdigit() for c in pwd):
            pool_size += 10
        if any(not c.isalnum() and ord(c) < 128 for c in pwd):
            pool_size += 32  # Standard ASCII special characters
        if any(ord(c) >= 128 for c in pwd):
            pool_size += 143000  # Extended Unicode character space

        return pool_size

    def calculate_shannon_entropy(self) -> float:
        """
        Calculates Shannon Entropy in bits: H = -sum(p_i * log2(p_i))
        """
        if not self.password:
            return 0.0

        length = len(self.password)
        counts = Counter(self.password)
        
        entropy = -sum((count / length) * math.log2(count / length) for count in counts.values())
        return round(entropy * length, 2)  # Total bits of entropy

    def get_entropy_metrics(self) -> dict:
        """
        Returns full entropy profile and strength rating based on total bits.
        """
        bits = self.calculate_shannon_entropy()
        pool_size = self.calculate_pool_size()

        # Score classification based on NIST / OWASP bit thresholds
        if bits < 28:
            rating = "Very Weak"
        elif bits < 36:
            rating = "Weak"
        elif bits < 60:
            rating = "Reasonable"
        elif bits < 128:
            rating = "Strong"
        else:
            rating = "Very Strong"

        return {
            "entropy_bits": bits,
            "pool_size": pool_size,
            "rating": rating
        }