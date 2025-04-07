export interface Book {
    id: number;
    title: string;
    author: string;
    publishingYear: number;
    pages: number;
}

export function isValidBook(book: any): book is Book {
    return (
        typeof book.id === 'number' &&
        typeof book.title === 'string' &&
        typeof book.author === 'string' &&
        typeof book.publishingYear === 'number' &&
        typeof book.pages === 'number'
    );
}
