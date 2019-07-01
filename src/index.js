import books from './routes/books/index'

export default (app) => {
  app.use('/books', books)
}
