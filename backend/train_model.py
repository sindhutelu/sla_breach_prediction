import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle

# 1. Load your dataset (update filename if needed)
df = pd.read_csv("synthetic_sla_breach_50k_valid.csv")

# 2. Features and Target
X_raw = df["description"]
y = df["sla_breach"]  # Replace with your target column name

# 3. Vectorize Text Data
vectorizer = TfidfVectorizer(max_features=500)
X = vectorizer.fit_transform(X_raw)

# 4. Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 5. Train the Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 6. Save the model
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

# 7. Save X_test and y_test as DataFrames
X_test_df = pd.DataFrame(X_test.toarray(), columns=vectorizer.get_feature_names_out())
y_test_df = pd.DataFrame(y_test.values, columns=["sla_breach"])

X_test_df.to_csv("X_test.csv", index=False)
y_test_df.to_csv("y_test.csv", index=False)

print("✅ Model, X_test.csv, and y_test.csv saved.")
