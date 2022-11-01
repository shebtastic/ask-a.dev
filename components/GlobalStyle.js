import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --font-color: black;
    --background-color: white;
    --background-color-second: rgb(239, 240, 242);
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
  }
  
  @media (prefers-color-scheme: dark) {
    :root {
      --font-color: white;
      --background-color: #404040;
      --background-color-second: rgb(40, 40, 40);
    }

    html {
      color-scheme: dark;
    }
  }
`

export default GlobalStyle
