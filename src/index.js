import books from './routes/books'
import health from './routes/health'
import express from 'express'
import searchBook from './routes/books/searchBook';

export default (app) => {
  app.get('/health', (req, res, next) => res.json(['Hi, I am very fine!']))
  app.get('/searchBooks', (req, res, next) => searchBook(req,res))
}



// export default (app) => {
//   app.use('/books', books)
//   app.use('/health', health)
// }
