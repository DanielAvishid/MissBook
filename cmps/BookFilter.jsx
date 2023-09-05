const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }

  const { title, price, publishedDate } = filterByToEdit

  return (
    <section className='book-filter'>
      <h2>Filter Our Books</h2>
      <form onSubmit={onSubmitFilter}>
        <label htmlFor='title'>Title: </label>
        <input
          value={title}
          onChange={handleChange}
          type='text'
          placeholder='By Title'
          id='title'
          name='title'
        />

        <label htmlFor='price'>Min Price: </label>
        <input
          value={price}
          onChange={handleChange}
          type='number'
          placeholder='By Price'
          id='price'
          name='price'
        />

        <label htmlFor='publishedDate'>Published: </label>
        <input
          value={publishedDate}
          onChange={handleChange}
          type='number'
          placeholder='By Published Date'
          id='publishedDate'
          name='publishedDate'
        />
      </form>
    </section>
  )
}
