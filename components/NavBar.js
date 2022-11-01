import Link from 'next/link'
import styled from 'styled-components'

function NavBar({ location }) {
  return (
    <nav>
      <ul>
        <li>
          <HighlightableLink
            href="/"
            active={location !== '/settings'}
          >
            Start
          </HighlightableLink>
        </li>
        <li>
          <HighlightableLink
            href="/settings"
            active={location === '/settings'}
          >
            Settings
          </HighlightableLink>
        </li>
      </ul>
    </nav>
  )
}

function HighlightableLink({ href, children, active }) {
  return active ? (
    <ActiveLink href={href}>{children}</ActiveLink>
  ) : (
    <InactiveLink href={href}>{children}</InactiveLink>
  )
}

const ActiveLink = styled(Link)`
  background-color: red;
`

const InactiveLink = styled(Link)``

function BackLink() {
  return <Link href="/">{'← Go Back'}</Link>
}

export default NavBar
export { BackLink, ActiveLink, InactiveLink }
