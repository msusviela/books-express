"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/books', (req, res) => {
    res.send([
        {
            id: 1,
            name: "Harry Potter and the Philosopher's Stone",
        },
    ]);
});
app.get('/books/:id', (req, res) => {
    res.send({
        id: 1,
        name: "Harry Potter and the Philosopher's Stone",
    });
});
app.post('/books', (req, res) => {
    res.send('Create a new book');
});
app.put('/books/:id', (req, res) => {
    res.send('Update a book');
});
app.delete('/books/:id', (req, res) => {
    res.send('Delete a book');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
