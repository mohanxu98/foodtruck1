from flask import Flask, request, jsonify, make_response
from math import sin, cos, sqrt, atan2, radians
import pandas as pd
import numpy as np

app = Flask(__name__)

# Load the dataset
data = pd.read_csv('food-truck-data.csv')

# Ensure latitude and longitude are numeric
data['Latitude'] = pd.to_numeric(data['Latitude'], errors='coerce')
data['Longitude'] = pd.to_numeric(data['Longitude'], errors='coerce')

# Function to calculate distance
def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6373.0  # Radius of the Earth in kilometers
    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = R * c
    return distance

@app.route('/api/foodtrucks', methods=['GET'])
def get_foodtrucks():
    try:
        lat = float(request.args.get('lat'))
        lon = float(request.args.get('lon'))
        radius = float(request.args.get('radius', 5))

        def within_radius(row):
            truck_lat = row['Latitude']
            truck_lon = row['Longitude']
            distance = calculate_distance(lat, lon, truck_lat, truck_lon)
            return distance <= radius

        nearby_trucks = data[data.apply(within_radius, axis=1)].head(5)
        
        # Replace NaN with None
        nearby_trucks = nearby_trucks.replace({np.nan: None})
        
        # Convert the DataFrame to a list of dictionaries
        nearby_trucks_list = nearby_trucks.to_dict(orient='records')
        
        # Print the type of the data
        print('Type of nearby_trucks_list:', type(nearby_trucks_list))
        
        response = jsonify(nearby_trucks_list)  # Properly use jsonify
        response.headers['Access-Control-Allow-Origin'] = '*'  # Add CORS header
        response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'  # Allow specific methods
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'  # Allow specific headers
        return response
    except Exception as e:
        response = make_response(jsonify({'error': str(e)}), 400)
        response.headers['Access-Control-Allow-Origin'] = '*'  # Add CORS header
        response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'  # Allow specific methods
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'  # Allow specific headers
        return response

if __name__ == '__main__':
    host = '0.0.0.0'  # Accessible externally
    port = 5000       # Default port
    app.run(host=host, port=port, debug=True)
