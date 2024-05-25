from flask import Flask, request, jsonify, make_response, after_this_request
from math import sin, cos, sqrt, atan2, radians
import pandas as pd

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
    print('this is the distance')
    print(distance)
    return distance

@app.route('/api/foodtrucks', methods=['GET'])
def get_foodtrucks():
    print('Backend reached')
    try:
        lat = float(request.args.get('lat'))
        lon = float(request.args.get('lon'))
        radius = float(request.args.get('radius', 5))

        def within_radius(row):
            truck_lat = row['Latitude']
            truck_lon = row['Longitude']
            print(f"Calculating distance from ({lat}, {lon}) to ({truck_lat}, {truck_lon})")
            distance = calculate_distance(lat, lon, row['Latitude'], row['Longitude'])
            print(f"Distance to {row['Applicant']} at {row['Latitude']}, {row['Longitude']}: {distance}")
            return distance <= radius

        nearby_trucks = data[data.apply(within_radius, axis=1)].head(5)
        print(nearby_trucks)
        
        
        # Convert the DataFrame to a list of dictionaries
        nearby_trucks_list = nearby_trucks.to_dict(orient='records')
        
        # Print the list to the console for debugging
        print('this is the list')
        print(nearby_trucks_list)
        
        response = make_response(jsonify(nearby_trucks_list))
        response.headers['Access-Control-Allow-Origin'] = '*'  # Add CORS header
        response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'  # Allow specific methods
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'  # Allow specific headers
        return response
    except Exception as e:
        print(f"Error: {e}")
        response = make_response(jsonify({'error': str(e)}), 400)
        response.headers['Access-Control-Allow-Origin'] = '*'  # Add CORS header
        response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'  # Allow specific methods
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'  # Allow specific headers
        return response

if __name__ == '__main__':
    host = '0.0.0.0'  # Accessible externally
    port = 5000       # Default port
    print(f"Running on http://{host}:{port}")
    app.run(host=host, port=port, debug=True)
