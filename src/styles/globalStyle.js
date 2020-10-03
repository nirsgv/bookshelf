import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    #root {
      overflow: hidden;
    }

    *, *:before, *:after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      
      @media (hover: none) {
          touch-action: manipulation;
      }
    }
    html {
      font-size: 62.5%;
    }

    body {
      font-size: 1.6rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    main {
      padding: 0 2rem 2rem 2rem;
    }

    
    ul {
      list-style: none;
    }

    input[type="number"] {
      width: 10rem;
    }
    
    svg {
    width: 1em;
    fill: currentColor;
    font-size: 2em;
    text-align: center;
    vertical-align: middle;
    box-sizing: content-box;
    }

  .App-header {
    display: flex;
    background-color: #282c34;
    font-size: 2.1rem;
    color: white;
    justify-content: space-between;
    padding: 1.4rem 3rem;
  }

  .logo {

    &_icon{
      margin-right: 1.4rem;
    }
  }
`;

export default GlobalStyle;
