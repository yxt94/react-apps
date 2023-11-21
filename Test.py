import requests
from google.auth import compute_engine

# Set your service account credentials file path
credentials_file = '/path/to/your/service_account_credentials.json'

# Authenticate using service account credentials
credentials = compute_engine.Credentials.from_service_account_file(credentials_file)

# Set the URL for making predictions
vertexai_endpoint = 'https://LOCATION-ml.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/endpoints/ENDPOINT_ID:predict'

# Construct the request payload
payload = {
    "instances": [
        # Include your input data for prediction
        # Example: {"input": [1.0, 2.0, 3.0]}
    ]
}

# Make a POST request to the Vertex AI predict endpoint
response = requests.post(
    vertexai_endpoint,
    json=payload,
    headers={
        "Authorization": f"Bearer {credentials.token}",
        "Content-Type": "application/json"
    }
)

# Handle the response
if response.status_code == 200:
    prediction_result = response.json()
    print("Prediction Result:", prediction_result)
else:
    print("Prediction failed with status code:", response.status_code)
    print("Error message:", response.text)
