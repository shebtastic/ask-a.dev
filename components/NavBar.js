import Link from 'next/link'
import styled from 'styled-components'

function NavBar({ className, location }) {
  return (
    <nav className={className}>
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

const ActiveLink = styled(Link)`
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 1.25em;
  background-color: var(--highlight-color-light);
  font-size: 1.25em;
  font-weight: bolder;
`

const InactiveLink = styled(Link)`
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 1.25em;
  font-size: 1.25em;
  font-weight: bolder;
`

function HighlightableLink({ href, children, active }) {
  return active ? (
    <ActiveLink href={href}>{children}</ActiveLink>
  ) : (
    <InactiveLink href={href}>{children}</InactiveLink>
  )
}

function BackLink() {
  return <Link href="/">{'← Go Back'}</Link>
}

const StyledNavBar = styled(NavBar)`
  width: 100vw;
  height: 5em;

  background-color: var(--background-color);
  box-shadow: 2px 7px 20px 5px rgb(0 0 0 / 35%);

  ul {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    border-top: solid black 2px;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    border-left: solid black 1px;
    border-right: solid black 1px;
  }
`

export default StyledNavBar
export { BackLink, ActiveLink, InactiveLink }
