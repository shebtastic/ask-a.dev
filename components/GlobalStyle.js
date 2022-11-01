import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --font-color: black;
    --background-color: white;
    --background-color-second: rgb(239, 240, 242);
    --highlight-color: hotpink;
    --highlight-color-light: lightpink;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 16px;
  }

  body {
    color: var(--font-color);
    background-color: var(--background-color);
  }
  
  h1, h2, h3, h4, h5, h6, ul, li, p {
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  ul {
    list-style: none;
  }
  
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5rem;
  }
  
  main h1 {
    margin: 1.5em 1em 1em 0em;
  }
  
  main section:first-of-type {
    margin: 0em 2em;
  }
  
  main section:first-of-type aside.ninja {
    ::before {
      content: '🥷';
      font-style: normal;
    }
    padding-top: 1em;
    font-style: italic;
    text-align: end;
  }
 
  nav {
    position: fixed;
    bottom: 0;
  }
  
  @media (prefers-color-scheme: dark) {
    :root {
      --font-color: white;
      --background-color: #404040;
      --background-color-second: rgb(40, 40, 40);
      --highlight-color: hotpink;
      --highlight-color-light: darkorchid;
    }

    html {
      color-scheme: dark;
    }
  }
`

export default GlobalStyle
