import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { BsCartFill } from "react-icons/bs";

export function NavBanner() {
  const { open, totalQuantity } = useCart();
  return (
    <Navbar id="navbar" sticky="top" expand="lg">
      <Container>
        <Col>
          <Row>
            <a  className="text-decoration-none" href="/"><p id="title">Food Shop</p></a>
          </Row>
          <Row id="navrow">
            <Col>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link id="link" to="/menu" as={NavLink}>
                Meny
              </Nav.Link>
              <Nav.Link id="link" to="/cocktails" as={NavLink}>
                Cocktails
              </Nav.Link>
              <Nav.Link id="link" to="/extras" as={NavLink}>
                Tillbehör
              </Nav.Link>
            </Nav>
            </Navbar.Collapse>
            </Col>
            <Col>
            {totalQuantity > 0 && (
              <Button
                onClick={() => open(true, "cart", "")}
                id="cartButton"
                variant="outline-dark"
                className="rounded-circle ms-auto"
              >
                <BsCartFill id="cartImage" />
                <div id="quantityIcon">{totalQuantity}</div>
              </Button>
            )}
            </Col>
          </Row>
        </Col>
      </Container>
    </Navbar>
  );
}
