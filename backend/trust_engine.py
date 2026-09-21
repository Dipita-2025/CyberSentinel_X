def calculate_trust_score(user_trust, device_trust, ip_reputation, ml_risk):

    values = [
        user_trust,
        device_trust,
        ip_reputation,
        ml_risk
    ]

    for value in values:
        if value < 0 or value > 100:
            raise ValueError("All values must be between 0 and 100.")

    ml_trust = 100 - ml_risk

    trust_score = (
        0.30 * user_trust +
        0.25 * device_trust +
        0.20 * ip_reputation +
        0.25 * ml_trust
    )

    return {
        "trust_score": round(trust_score, 2),
        "user_trust": user_trust,
        "device_trust": device_trust,
        "ip_reputation": ip_reputation,
        "ml_risk": ml_risk,
        "ml_trust": ml_trust
    }


if __name__ == "__main__":

    result = calculate_trust_score(
        user_trust=90,
        device_trust=80,
        ip_reputation=70,
        ml_risk=20
    )

    print(result)