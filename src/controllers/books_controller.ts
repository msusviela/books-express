import { Request, Response } from 'express';
import { BookRepository } from '../data/books_repository';
import { Book, isValidBook } from '../interfaces/book';
import { GOOGLE_BOOKS_API_URL, API_KEY } from '../utils/google_book_config';
import axios from 'axios';
import { Pipeline } from '../utils/pipeline';
import { toUpperCaseFilter, removeBlanks } from '../utils/filters';

const bookRepository = new BookRepository();

export const getBooks = (req: Request, res: Response) => {
  const books = bookRepository.getAll();
  if (books.length > 0) {
    res.status(200).send(books);
  } else {
    res.status(200).send('No books available :(');
  }
};

export const getBookById = (req: Request, res: Response) => {
  const book = bookRepository.getAll().find((book) => book.id === parseInt(req.params.id));
  if (book) {
    res.status(200).send(book);
  } else {
    res.status(404).send('Book not found :()');
  }
};

export const createBook = (req: Request, res: Response) => {
  const books = bookRepository.getAll();
  const book: Book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    publishingYear: req.body.publishingYear,
    pages: req.body.pages,
  };
  const isValid = isValidBook(book);
  if (!isValid) {
    res.status(400).send('Please include all required fields.');
    return;
  }
  bookRepository.add(book);
  res.status(201).send(book);
};

export const updateBook = (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  const books = bookRepository.getAll();
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    const existingBook = books[bookIndex];
    const updatedBook: Book = {
      ...existingBook,
      title: req.body.title || existingBook.title,
      author: req.body.author || existingBook.author,
      publishingYear: req.body.publishingYear || existingBook.publishingYear,
      pages: req.body.pages || existingBook.pages,
    };
    bookRepository.update(bookId, updatedBook);
    res.send(updatedBook);
  } else {
    res.status(404).send('Book not found :()');
  }
};

export const deleteBook = (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  const books = bookRepository.getAll();
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    bookRepository.delete(bookId);
    res.status(204).send(`Book with id ${bookId} deleted successfully :)`);
  } else {
    res.status(404).send('Book not found :()');
  }
};

export const getBooksByAuthor = async (req: Request, res: Response) => {
  try {
    if (API_KEY === null || API_KEY === '') {
      res.status(401).send('API key not set.');
      return;
    }
    const author = req.params.author;
    const encodedAuthor = encodeURIComponent(author);
    const response = await axios.get(`${GOOGLE_BOOKS_API_URL}?q=inauthor:${encodedAuthor}&key=${API_KEY}`);

    if (response.data) {
      res.send(response.data);
    } else {
      res.status(404).send('Book not found :(');
    }
  } catch (error) {
    res.status(500).send('An error occurred while fetching the author books :(');
  }
};

export const transformTitle = (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  const books = bookRepository.getAll();
  const book = books.find((book) => book.id === bookId);

  if (book) {
    var pipeline = new Pipeline();
    pipeline.use(toUpperCaseFilter);
    pipeline.use(removeBlanks);

    const result = pipeline.run(book.title);

    res.status(200).send({ result });
  } else {
    res.status(404).send('Book not found :()');
  }
};
