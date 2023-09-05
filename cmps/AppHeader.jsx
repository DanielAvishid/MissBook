import { UserMsg } from './UserMsg.jsx'

const { NavLink, Link } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className='app-header full main-layout'>
      <div className="nav-container">
        <Link className="logo" to={'/'}>Miss Book</Link>
        <nav className='app-nav'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/book'>Books</NavLink>
        </nav>
      </div>
      <UserMsg />
    </header>
  )
}
