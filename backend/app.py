from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import io
import base64
import shap
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay, roc_curve, RocCurveDisplay

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

# Load model and test data
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

X_test = pd.read_csv("X_test.csv")
y_test = pd.read_csv("y_test.csv").values.ravel()

@app.route("/visual/confusion_matrix", methods=["GET"])
def get_confusion_matrix():
    print("📌 /visual/confusion_matrix route hit")  # Debug line

    y_pred = model.predict(X_test)
    cm = confusion_matrix(y_test, y_pred)
    disp = ConfusionMatrixDisplay(confusion_matrix=cm)
    disp.plot(cmap=plt.cm.Blues)

    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    image_base64 = base64.b64encode(buf.read()).decode("utf-8")
    buf.close()
    plt.close()

    return jsonify({"image": image_base64})



@app.route("/visual/roc", methods=["GET"])
def get_roc_curve():
    if hasattr(model, "predict_proba"):
        y_scores = model.predict_proba(X_test)[:, 1]
    else:
        y_scores = model.decision_function(X_test)

    fpr, tpr, _ = roc_curve(y_test, y_scores)
    RocCurveDisplay(fpr=fpr, tpr=tpr).plot()

    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    image_base64 = base64.b64encode(buf.read()).decode("utf-8")
    buf.close()
    plt.close()

    return jsonify({"image": image_base64})


@app.route("/visual/shap", methods=["GET"])
def get_shap_plot():
    X_sample = X_test.head(100)

    explainer = shap.Explainer(model, X_sample)
    shap_values = explainer(X_sample)

    shap.plots.beeswarm(shap_values, show=False)

    buf = io.BytesIO()
    plt.savefig(buf, format="png", bbox_inches="tight")
    buf.seek(0)
    image_base64 = base64.b64encode(buf.read()).decode("utf-8")
    buf.close()
    plt.close()

    return jsonify({"image": image_base64})
@app.route("/", methods=["GET"])
def home():
    return "✅ Flask backend is working"


if __name__ == "__main__":
    app.run(debug=True)
