import { Container } from "react-bootstrap";
import { NavBanner } from "./components/NavBanner";
import { CartProvider } from "./contexts/CartContext";
import { Route, Routes } from "react-router-dom";
import Menu from "./pages/Menu";
import Cocktail from "./pages/Cocktail";
import Extras from "./pages/Extras";
import "./styles/App.css";

export default function App() {
  return (
    <CartProvider>
      <NavBanner />
      <Container>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cocktails" element={<Cocktail />} />
          <Route path="/extras" element={<Extras />} />
        </Routes>
      </Container>
    </CartProvider>
  );
}
