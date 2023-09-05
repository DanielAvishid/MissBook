import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { BooksData } from './booksData.js'

const BOOKS_KEY = 'booksDB'
var gFilterBy = { title: '', price: 0, publishedDate: 0 }
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getEmptyReview,
  getNextBookId,
  getFilterBy,
  setFilterBy,
  getDefaultFilter,
  addReview,
  deleteReview,
}

function query(filterBy) {
  return storageService.query(BOOKS_KEY).then(books => {
    if (filterBy.title) {
      const regex = new RegExp(filterBy.title, 'i')
      books = books.filter(book => regex.test(book.title))
    }
    if (filterBy.price) {
      books = books.filter(book => book.listPrice.amount >= filterBy.price)
    }
    if (filterBy.publishedDate) {
      books = books.filter(book => book.publishedDate >= filterBy.publishedDate)
    }
    return books
  })
}

function get(bookId) {
  return storageService.get(BOOKS_KEY, bookId)
    .then(book => {
      book = _setNextPrevBookId(book)
      return book
    })
}

function remove(bookId) {
  return storageService.remove(BOOKS_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOKS_KEY, book)
  } else {
    return storageService.post(BOOKS_KEY, book)
  }
}

function addReview(bookId, review) {
  review = { ...review }
  review.id = utilService.makeId()
  return get(bookId)
    .then(book => {
      if (book.reviews) book.reviews.push(review)
      else book.reviews = [review]
      return book
    })
    .then(book => storageService.put(BOOKS_KEY, book))
}

function deleteReview(bookId, reviewId) {
  return get(bookId).then(book => {
    book.reviews = book.reviews.filter(review => review.id !== reviewId)
    return storageService.put(BOOKS_KEY, book)
  })
}

function getEmptyReview() {
  return {
    fullname: '',
    rating: '',
    readAt: '',
  }
}

function getEmptyBook() {
  return {
    title: '',
    subtitle: '',
    authors: [],
    publishedDate: 1900,
    description: '',
    pageCount: 0,
    categories: [],
    thumbnail: '../assets/imgs/20.jpg',
    language: 'en',
    listPrice: {
      amount: 0,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  }
}

function getFilterBy() {
  return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
  if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
  if (filterBy.price !== undefined) gFilterBy.price = filterBy.price
  if (filterBy.publishedDate !== undefined)
    gFilterBy.publishedDate = filterBy.publishedDate
  return gFilterBy
}

function getNextBookId(bookId) {
  return storageService.query(BOOKS_KEY).then(books => {
    var idx = books.findIndex(book => book.id === bookId)
    if (idx === books.length - 1) idx = -1
    return books[idx + 1].id
  })
}

function getDefaultFilter() {
  return { title: '', price: '', publishedDate: '' }
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOKS_KEY)
  if (!books || !books.length) {
    books = BooksData.getBooks()
    utilService.saveToStorage(BOOKS_KEY, books)
  }
}

function _setNextPrevBookId(book) {
  return storageService.query(BOOKS_KEY).then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
    const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
    const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
    book.nextBookId = nextBook.id
    book.prevBookId = prevBook.id
    return book
  })
}
