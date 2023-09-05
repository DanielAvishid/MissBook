const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { AddReview } from './cmps/AddReview.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './pages/About.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { Home } from './pages/Home.jsx'

export function App() {
  return (
    <Router>
      <section className='app main-layout'>
        <AppHeader />

        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/book/:bookId' element={<BookDetails />} />
            <Route path='review' element={<AddReview />} />
            <Route path='/book/edit/:bookId' element={<BookEdit />} />
            <Route path='/book/edit' element={<BookEdit />} />
            <Route path='/book' element={<BookIndex />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}
