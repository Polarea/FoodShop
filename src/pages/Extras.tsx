import { Col, Row } from "react-bootstrap";
import { ExtrasItem } from "../components/ExtrasItem";
import { useCart } from "../contexts/CartContext";

function Extras() {
  const {ingredients} = useCart();
  
  return (
    <Row className="g-3 mb-5" xs={1} md={2} lg={3}>
{ingredients.map(ingredient => (
          <Col key={ingredient._id}>
    <ExtrasItem {...ingredient}/>
  </Col>
        ))}
</Row>
  )
}

export default Extras
