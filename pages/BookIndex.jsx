import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    bookService.query(filterBy).then(books => {
      setBooks(books)
    })
  }, [filterBy])

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
        showSuccessMsg(`Book Removed! ${bookId}`)
      })
      .catch(err => {
        console.error(err)
        showErrorMsg(`Problem Removing ${bookId}`)
      })
  }

  function onSetFilterBy(filterBy) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
  }

  if (!books) return <div>Loading...</div>
  return (
    <section className='book-index'>
      <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <button>
        <Link to='/book/edit'>Add Book</Link>
      </button>
      <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
  )
}
