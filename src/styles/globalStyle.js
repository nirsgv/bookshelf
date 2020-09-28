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

    button {
      font-family: 'Open Sans', sans-serif;
      font-weight: 300;
      padding: 1rem;
      color: #333;
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
    background-color: #282c34;
    min-height: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }
`;

export default GlobalStyle;
