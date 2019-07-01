import searchBook from './routes/books/searchBook';
import bookVoting from './routes/books/bookVoting';
import filterBooks from './routes/books/filterBooks';

export default (app) => {
  app.get('/health', (req, res, next) => res.json(['Hi, I am very fine!']))
  app.get('/searchBooks', (req, res, next) => searchBook(req,res))
  app.post('/bookVoting', (req, res, next) => bookVoting(req,res))
  app.post('/filterBooks', (req, res, next) => filterBooks(req,res))
}
