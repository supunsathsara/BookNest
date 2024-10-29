import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Pencil2Icon } from "@radix-ui/react-icons";


const base_url = import.meta.env.VITE_SERVER_URL;

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  description: z.string().min(1, "Description is required"),
});

interface NewBookProps {
  onBookAdded: () => void;
}

const NewBook = ({ onBookAdded }: NewBookProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async () => {
    const validation = bookSchema.safeParse({ title, author, description });

    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors
          .map((err) => err.message)
          .join(", "),
      });
      return;
    }

    try {
      const response = await fetch(`${base_url}/api/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title, author, description }),
      });

      if (response.ok) {
        // Close the dialog
        setOpen(false);
        setTitle("");
        setAuthor("");
        setDescription("");

        toast({
          title: "Book Added",
          description: `The book "${title}" has been added successfully`,
        });
        onBookAdded(); // Reload the book list
      } else {
        toast({
          title: "Error",
          description: "Failed to add the book",
        });
      }
    } catch (error) {
      console.error("Error adding book:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="p-5">
          Add Book
          <Pencil2Icon className="h-6 w-6" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Add Book
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewBook;