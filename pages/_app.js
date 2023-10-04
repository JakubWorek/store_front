import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,700;1,600&display=swap');
  body{
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
    background-color: #eee;
  }
`;

export default function App({ Component, pageProps }) {
  return(
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  ); 
}
