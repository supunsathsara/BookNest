import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Root() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex justify-between items-center p-4">
        <div className="text-2xl font-bold">BookNest</div>

        <div className="space-x-2">
          <Link to="/login" className="text-white hover:text-purple-500">
            <Button
              variant="ghost"
              className="text-white hover:text-purple-500"
            >
              Sign in
            </Button>
          </Link>
          <Link to="/register" className="text-white hover:text-purple-500">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Join Now
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Library Management System
          </h1>
          <p className="text-xl mb-8">
            Organize and manage your library efficiently. Wide range of features
            available.
          </p>
          <div className="space-x-4">
          <Link to="/register" className="text-whit">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Get Started
            </Button>
          </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">
              <span className="text-purple-500 mr-2">📚</span>
              Extensive Catalog
            </h3>
            <p>
              Manage thousands of books in your library. Keep track of all your
              books and their details in one place.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">
              <span className="text-purple-500 mr-2">🔖</span>
              Easy Management
            </h3>
            <p>
              Manage your library with ease. Add, update, and delete books with
              just a few clicks. Keep your library organized.
            </p>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 right-0 w-1/3 h-1/3 pointer-events-none">
        <div className="relative w-full h-full">
          <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-purple-600 rounded-tl-full"></div>
          <div className="absolute bottom-8 right-8 w-1/2 h-1/2 bg-purple-800 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
