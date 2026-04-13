const express = require('express');
const router = express.Router();
const booksRepo = require('../repositories/books.repo');

router.get('/', async (req, res, next) => {
    try {
        const books = await booksRepo.getAll();
        res.json(books);
    } catch (err) {
        next(err); // Pass error to global error handler
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const book = await booksRepo.getById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newBook = await booksRepo.create(req.body);
        res.status(201).json(newBook);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const updatedBook = await booksRepo.update(req.params.id, req.body);
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.json(updatedBook);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedBook = await booksRepo.delete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted successfully', book: deletedBook });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
