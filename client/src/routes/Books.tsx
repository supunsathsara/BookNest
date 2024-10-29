import NewBook from "@/components/NewBook";
import { bookColumns } from "@/components/ui/book-columns";
import { BookTable } from "@/components/ui/book-table";
import { Book } from "@/types/Index";

const Books = () => {
  const books: Book[] = [
    {
      id: 1,
      title: "Book 1",
      author: "Mr.D",
      description: "A nice book that looks great if this works",
      createdAt: "2024-10-28T23:39:16.490913",
    },
    {
      id: 2,
      title: "Book 3",
      author: "Mrs.Angel",
      description: "A great book",
      createdAt: "2024-10-28T23:40:13.891087",
    },
    {
      id: 4,
      title: "Book 4",
      author: "Author 4",
      description: "This is the 04th book",
      createdAt: "2024-10-29T00:39:48.099596",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-primary-foreground p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center">Library Books</h1>
      </header>
      <div className="mb-8">
        <NewBook />
      </div>
      <div>
        <BookTable columns={bookColumns} data={books} />
      </div>
    </div>
  );
};

export default Books;