import { Col, Row } from "react-bootstrap";
import { ExtrasItem } from "../components/ExtrasItem";
import { useCart } from "../contexts/CartContext";

function Extras() {
  const {sides} = useCart();
  
  return (
    <Row className="g-3 mb-5" xs={1} md={2} lg={3}>
{sides.map(sides => (
          <Col key={sides.idMeal}>
    <ExtrasItem {...sides}/>
  </Col>
        ))}
</Row>
  )
}

export default Extras
