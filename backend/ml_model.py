from xgboost import XGBClassifier
from pathlib import Path
import json


# ============================================================
# 1. File paths
# ============================================================

MODEL_PATH = Path(__file__).parent / "models" / "xgboost_model.json"

FEATURE_PATH = Path(__file__).parent / "models" / "feature_columns.json"


# ============================================================
# 2. Load trained XGBoost model
# ============================================================

model = XGBClassifier()

model.load_model(MODEL_PATH)


# ============================================================
# 3. Load the 70 feature names
# ============================================================

with open(FEATURE_PATH, "r") as f:
    feature_columns = json.load(f)


print("XGBoost model loaded successfully.")
print("Number of features:", len(feature_columns))


# ============================================================
# 4. Prediction function
# ============================================================

def predict_risk(features):

    # Check whether we received exactly 70 features
    if len(features) != len(feature_columns):
        raise ValueError(
            f"Expected {len(feature_columns)} features, "
            f"but received {len(features)}."
        )

    # Get probability of the request being an attack
    probability = model.predict_proba([features])[0][1]

    # Convert probability from 0–1 to risk score 0–100
    ml_risk = probability * 100

    # Our selected Experiment B threshold = 0.5
    if probability >= 0.5:
        prediction = "ATTACK"
    else:
        prediction = "BENIGN"

    return {
        "attack_probability": round(float(probability), 4),
        "ml_risk": round(float(ml_risk), 2),
        "prediction": prediction
    }


# ============================================================
# 5. Test when this file is run directly
# ============================================================

if __name__ == "__main__":

    import pandas as pd

    # Load one real test sample
    TEST_DATA_PATH = (
        Path(__file__).parent.parent
        / "data"
        / "processed"
        / "X_test.csv"
    )

    test_data = pd.read_csv(TEST_DATA_PATH)

    # Select the first row
    sample = test_data[feature_columns].iloc[0].tolist()

    # Make prediction
    result = predict_risk(sample)

    print("\nPrediction Result:")
    print(result)