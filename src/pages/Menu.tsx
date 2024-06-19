import { Col, Row } from "react-bootstrap";
import { useCart } from "../contexts/CartContext";
import { MenuItem } from "../components/MenuItem";

export default function Menu() {
  const { menu } = useCart();

  return (
    <>
      <Row className="g-3 mb-5" xs={1} md={2} lg={3}>
        {menu?.map((item) => (
          <Col key={item.idMeal}>
            <MenuItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
