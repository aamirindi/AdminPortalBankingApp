import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color-scheme: light dark;
    }
    
    :root {
        --bg-color: #f4f3ff;
        --btn-color: #646cff;
        --dark-color: #000000;
        --helper-color: #99b9ff;
        --helper-color2: #bad0ffdf;
    }   

    body {
        margin: 0;
        font-size: clamp(1rem, 1.5vw, 1.2rem);
        font-family: 'Poppins', sans-serif;
        overflow: auto;
        position: relative;
        background-color: rgba(0, 0, 0, 0.5);
        background-size: cover;
    }

    h1, h2 {
        font-size: 1.3em;
        line-height: 1.1;
        text-align: center;
        margin: 3rem;
        letter-spacing: .1rem;
        font-weight: 300;
        span{
            font-size: 2em;
        }
    }

    p,
    label,
    input,
    textarea {
        font-size: 1rem;
        line-height: 1.56;
        letter-spacing: 0.1rem;
        word-spacing: 0.06rem;
    }

    a {
        font-weight: 500;
        font-size: 1rem;
        letter-spacing: 0.1rem;
        color: white;
        text-decoration: none;
    }   
     button{
        letter-spacing: .15rem !important;
     }
    
    .user {
      list-style: none;
      padding: 2rem 1.5rem;
      border-radius: 5px;
      width: 500px;
      height: 150px;
      backdrop-filter: blur(5px);
      border: 1px solid var(--btn-color);

      div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        p {
          color: var(--helper-color2);
        }
      }
    }

  @media (max-width: 768px) {
    .user {
        width: 350px;
    }
}

    ::-webkit-scrollbar {
        width: 5px; 
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--btn-color);
        border-radius: 6px;

    }

    ::selection{
        color: #818181;
    }
`;
