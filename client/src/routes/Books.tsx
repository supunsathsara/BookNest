import { useEffect, useState } from "react";
import NewBook from "@/components/NewBook";
import { bookColumns } from "@/components/ui/book-columns";
import { BookTable } from "@/components/ui/book-table";
import { Book } from "@/types/index";

const base_url = import.meta.env.VITE_SERVER_URL;

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${base_url}/api/books`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        console.error("Failed to fetch books");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen w-full bg-primary-foreground p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center">Library Books</h1>
      </header>
      <div className="mb-8">
        <NewBook onBookAdded={fetchBooks} />
      </div>
      <div>
        <BookTable columns={bookColumns} data={books} />
      </div>
    </div>
  );
};

export default Books;
