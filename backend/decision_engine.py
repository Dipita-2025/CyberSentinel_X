from trust_engine import calculate_trust_score
from ml_model import predict_risk
from pathlib import Path
import pandas as pd


# ============================================================
# Decision Engine
# ============================================================

def make_decision(trust_score):

    if trust_score >= 80:
        return "ALLOW"

    elif trust_score >= 50:
        return "REVIEW"

    else:
        return "BLOCK"


# ============================================================
# Test integrated system
# ============================================================

if __name__ == "__main__":

    # Load real test data
    TEST_DATA_PATH = (
        Path(__file__).parent.parent
        / "data"
        / "processed"
        / "X_test.csv"
    )

    test_data = pd.read_csv(TEST_DATA_PATH)

    # Take one real network request
    sample = test_data.iloc[0]

    # Get the 70 features in the correct order
    features = sample[predict_risk.__globals__["feature_columns"]].tolist()

    # --------------------------------------------------------
    # Step 1: XGBoost prediction
    # --------------------------------------------------------

    ml_result = predict_risk(features)

    ml_risk = ml_result["ml_risk"]

    print("\nML Prediction:")
    print(ml_result)

    # --------------------------------------------------------
    # Step 2: Trust Engine
    # --------------------------------------------------------

    # These are temporary test values.
    # Later they will come from the application/user/device.
    user_trust = 90
    device_trust = 80
    ip_reputation = 70

    trust_result = calculate_trust_score(
        user_trust=user_trust,
        device_trust=device_trust,
        ip_reputation=ip_reputation,
        ml_risk=ml_risk
    )

    trust_score = trust_result["trust_score"]

    print("\nTrust Result:")
    print(trust_result)

    # --------------------------------------------------------
    # Step 3: Final Decision
    # --------------------------------------------------------

    decision = make_decision(trust_score)

    print("\nFinal Decision:")
    print("Trust Score:", trust_score)
    print("Decision:", decision)