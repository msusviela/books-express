import { Book } from "../interfaces/book";

export class BookRepository {
    private books: Book[] = [
        {
            id: 1,
            title: "Ballad of Songbirds and Snakes",
            author: "Suzanne Collins",
            publishingYear: 2020,
            pages: 528,
        },
        {
            id: 2,
            title: "Sunrise on the Reaping",
            author: "Suzanne Collins",
            publishingYear: 2025,
            pages: 341,
        },
        {
            id: 3,
            title: "Harry Potter and the Philosopher's Stone",
            author: "J.K. Rowling",
            publishingYear: 1997,
            pages: 223,
        },
    ];

    public add(newBook: Book): void {
        this.books.push(newBook);
    }

    public delete(bookId: number): boolean {
        const index = this.books.findIndex(book => book.id === bookId);
        if (index !== -1) {
            this.books.splice(index, 1);
            return true;
        }
        return false;
    }

    public update(bookId: number, updatedBook: Partial<Book>): boolean {
        const book = this.books.find(book => book.id === bookId);
        if (book) {
            Object.assign(book, updatedBook);
            return true;
        }
        return false;
    }

    public getAll(): Book[] {
        return this.books;
    }
}
