
# Notes App

A full-stack MERN application for managing notes. This app allows users to securely create an account, log in, and manage their notes with features like adding, editing, deleting, pinning, and searching.

## Features

- **User Authentication**: Secure login and sign-up functionality, allowing users to manage their notes.
- **CRUD Operations**: Users can add, edit, and delete notes with ease.
- **Pin Important Notes**: Highlight important notes by pinning them to the top for quick access.
- **Search Functionality**: Easily find notes by searching through all available notes.

## Technologies Used

- **MongoDB**: Database to store and manage notes data.
- **Express**: Backend framework for creating a RESTful API.
- **React JS**: Frontend framework to build a responsive and interactive user interface.
- **Node JS**: Server-side runtime environment for managing API requests and handling authentication.

## Who Is This For?

- **Beginners**: A hands-on introduction to building a full-stack application with the MERN stack.
- **Intermediate Developers**: An opportunity to enhance MERN stack skills by developing a functional app.
- **Anyone**: Looking to build a practical project and learn essential web development skills.

## Project Structure

### Backend (Express & Node.js)
1. **User Authentication**: Implements secure authentication using JWTs, allowing users to sign up, log in, and log out.
2. **CRUD Operations**: Provides APIs for creating, reading, updating, and deleting notes.
3. **Pin & Search Functionality**: Special API routes for pinning notes and performing searches.

### Frontend (React JS)
1. **User Interface**: A responsive and dynamic interface where users can manage their notes.
2. **Search & Pin Functionality**: Easily search through notes and pin important ones.
3. **Authentication Integration**: Users can log in and sign up to access their notes securely.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB (local or Atlas cloud instance)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/notes-app.git
   cd notes-app
   ```

2. **Backend Setup**:
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file for environment variables:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
   - Start the backend server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup**:
   - Navigate to the frontend folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React app:
     ```bash
     npm start
     ```

### Project Workflow

1. **Project Setup**: Set up the development environment and initialize the project.
2. **Backend Development**: Build a RESTful API with Node.js, Express, and MongoDB.
3. **Frontend Development**: Create a user-friendly interface using React.
4. **Connect Frontend and Backend**: Integrate the API with the React frontend.
5. **Implement Features**: Add authentication, CRUD operations, pinning, and search functionality.

## Usage

1. **Sign Up / Log In**: Create an account or log in to access the app.
2. **Manage Notes**:
   - **Add New Note**: Add notes with a simple and intuitive interface.
   - **Edit & Delete**: Update or remove notes as needed.
   - **Pin Notes**: Pin notes to keep them at the top for easy access.
   - **Search Notes**: Use the search bar to quickly find notes.

## License

This project is licensed under the MIT License.
