# Food Truck Locator

This project is a food truck locator application that allows users to find nearby food trucks based on their current location or a manually entered location. The backend is built using Flask, and the frontend is built using React.

## Features

- Locate food trucks based on current or manually entered location
- Display food truck details such as name, location description, address, and food items
- Responsive design with a user-friendly interface

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm (Node Package Manager)
- pip (Python Package Installer)
- Flask
- pandas
- axios

## Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/food-truck-locator.git
   cd food-truck-locator
2. **Create virtual environment**
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

4. **Install backend dependencies**
   
   ```bash
   pip install -r requirements.txt

6. **Create a file named requirements.txt in the project directory and add the following dependencies:**

    ```bash
    Flask
    pandas

7. **Prepare your data** 
    Make sure you have a CSV file named food-truck-data.csv with the necessary food truck data in the project directory.

8. **Run the backend server**
      ```bash
      python app.py

## Frontend Setup

1. **Navigate to the frontend directory**

   ```bash
   cd frontend
3. **Install frontend dependencies**

   ```bash
   npm install

4. **Start the frontend development server**

    ```bash
    npm start

Step 4: Access the application
Open your web browser and navigate to http://localhost:3000.

Project Structure
php
Copy code
foodtruck-locator/
├── foodtruck-be/         # Backend directory
│   ├── app.py            # Flask application
│   ├── food-truck-data.csv  # CSV file with food truck data
│   └── requirements.txt  # Backend dependencies
└── foodtruck-fe/         # Frontend directory
    ├── public/
    │   ├── index.html
    │   └── foodtruckpic.jpeg # Image used in the frontend
    ├── src/
    │   ├── App.js        # Main React component
    │   ├── App.css       # CSS styles
    │   └── index.js      # Entry point for the React application
    └── package.json      # Frontend dependencies
Usage
Open the application in your web browser.
Use the checkbox to toggle between using your current location and manually entering a location.
Enter a latitude, longitude, and radius if manually entering a location.
Click the "Find Food Trucks" button to display nearby food trucks.
Click on a food truck entry to view its detailed schedule.
Contributing
If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

License
This project is licensed under the MIT License.

Acknowledgements
Icons by Icons8
Built with React and Flask


