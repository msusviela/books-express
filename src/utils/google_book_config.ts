import dotenv from 'dotenv';

dotenv.config();

export const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';
export const API_KEY = process.env.GOOGLE_API_KEY;