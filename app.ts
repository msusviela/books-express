import express, { Request, Response } from 'express';
import { getBooks, getBookById, createBook, updateBook, deleteBook, getBooksByAuthor, transformTitle } from './src/controllers/books_controller';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World :)!');
});

app.get('/books', getBooks);
// app.get('/books/:id', getBookById);
app.post('/books', createBook);
app.put('/books/:id', updateBook);
app.delete('/books/:id', deleteBook);
app.get('/books/authors/:author', getBooksByAuthor);
app.get('/books/:id', transformTitle);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


