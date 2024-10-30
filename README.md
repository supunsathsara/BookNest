# BookNest

BookNest is a Library Management System that helps users organize and manage the books in their library. This application consists of a backend built with ASP.NET Core and a frontend built with React.

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (for the React frontend)
- [Docker](https://www.docker.com/) (optional, for running the application in containers)

## Getting Started

### Cloning the Repository

1. **Clone the repository:**

   ```sh
   git clone https://github.com/supunsathsara/BookNest.git
   ```

2. **Navigate to the project directory:**

   ```sh
   cd BookNest
   ```

## Running the Application Locally

### Backend (ASP.NET Core)

1. **Navigate to the backend project directory:**

   ```sh
   cd BookNest
   ```

2. **Restore the dependencies:**

   ```sh
   dotnet restore
   ```

3. **Update the database:**

   ```sh
   dotnet ef database update
   ```

4. **Run the backend application:**

   ```sh
   dotnet run
   ```

   The backend API will be available at `http://localhost:5275`.

### Frontend (React)

1. **Navigate to the client directory:**

   ```sh
   cd client
   ```

2. **Create a `.env.local` file with the following content:**

   ```env
   VITE_SERVER_URL = 'http://localhost:5275'
   ```

3. **Install the dependencies:**

   ```sh
   npm install
   ```

4. **Run the frontend application:**

   ```sh
   npm start
   ```

   The frontend application will be available at `http://localhost:5173`.

### Running with Docker

1. **Build and run the Docker containers:**

   ```sh
   docker-compose up --build
   ```

   This will start both the backend and frontend services.

## Features

- **User authentication:** Users can sign up and log in to access the application.
- **Create a new book record:** Users can add new books to their library.
- **View a list of existing book records:** Users can view the books they have added.
- **Update an existing book record:** Users can update the details of their books.
- **Delete a book record:** Users can delete books from their library.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
