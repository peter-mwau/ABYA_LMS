# ABYA_LMS
An online learning platform which is built using both django for backend and react for frontend.

## Repository Structure

- `django_backend/`: Contains the Django project for the backend
- `react_frontend/`: Contains the React project for the frontend

## Prerequisites

- Python 3.10+
- Node.js 14+
- npm 6+ or yarn 1.22+
- Git

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/abya-university/ABYA_LMS.git
cd ABYA_LMS
```

### 2. Backend Setup (Django)

# Navigate to the Django backend directory
cd django_backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS and Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Apply database migrations
python manage.py migrate

# Create a superuser (optional)
python manage.py createsuperuser

# Start the Django development server
python manage.py runserver


The Django backend should now be running at http://localhost:8000.

## Open another terminal and navigate to the frontend
### 3. Frontend Setup (React)
bashCopy# Navigate to the React frontend directory
cd ../react_frontend

# Install Node.js dependencies
npm install

# Start the React development server
npm start


#### The React frontend should now be running at http://localhost:3000.

### 3. Blockchaincerts_FatApi
The repo is a smart contract for issuing and managing blockchain certificates

## Requirements

- FastAPI
- Uvicorn
- Other dependencies listed in `requirements.txt`

## Installation

### Clone the Repository
```bash
git clone https://github.com/Mickmacha/Blockchaincerts_FastApi.git
cd Blockchaincerts_FastApi
```

### Create a Virtual Environment to manage dependencies
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`


### Install Required dependenciess using Pip
pip install -r requirements.txt

### Running The FastApi Server
uvicorn main:app --host 0.0.0.0 --port 8080





#### Access the Django admin interface at http://localhost:8000/admin
