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
     python3 -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

3. **Install backend dependencies** 
    pip install -r requirements.txt

4. **Create a file named requirements.txt in the project directory and add the following dependencies:**

    Flask
    pandas

5. **Prepare your data** 
    Make sure you have a CSV file named food-truck-data.csv with the necessary food truck data in the project directory.

6. **Run the backend server** 
    python app.py

## Frontend Setup

1. **Navigate to the frontend directory**

    bash
    cd frontend
2. **Install frontend dependencies**

    bash
    npm install

3. **Start the frontend development server**

    bash
    npm start
