import NavBar from './NavBar'

function Layout({ children, location }) {
  return (
    <>
      <header></header>
      <main>{children}</main>
      <footer>
        <NavBar location={location} />
      </footer>
    </>
  )
}

export default Layout
