import { useState } from "react";
import { Card, Button, Row, Col, Carousel} from "react-bootstrap";
import { useCart } from "../contexts/CartContext";

export default function Cocktail() {
  const {
    drinks,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    getQuantity,
  } = useCart();

  const [drink] = useState(drinks.drinks[0]);
 
  const quantity = getQuantity(drink?.idDrink);

  return (
    <Card key={drink?.idDrink} className="text-align-center mt-3">
      <Card.Body>
        <Row className="d-flex flew-row" xs={1} md={2} lg={2}>
          <Col className="flex-column">
          <Carousel fade>
            {drinks.drinks.map(drink => {
              return (
                <Carousel.Item>
        <img src={drink.strDrinkThumb} key={drink.idDrink} className="rounded"/>
        <Carousel.Caption>
          <h3 className="text-shadow-lg">{drink.strDrink}</h3>
        </Carousel.Caption>
      </Carousel.Item>
              );
            })}
      
    </Carousel>
          </Col>
          <Col className="flex-column">
           <div className="btn-group d-flex justify-content-between" role="group">
            <Button type="button" className="btn btn-light btn-outline-dark">Non</Button>
            <Button type="button" className="btn btn-light btn-outline-dark">Non</Button>
            <Button type="button" className="btn btn-light btn-outline-dark">Non</Button>
            </div>
            <Card.Title
              style={{
                letterSpacing: "0.5rem",
                textShadow: "1px 1px 10px",
              }}
            >
              {drink?.strDrink}
            </Card.Title>
            <div className="mb-3 fs-5">{drink?.price}</div>
            <div className="mb-3 fs-5">{drink?.quantity}</div>
            <div className="mt-auto">
              {quantity === 0 ? (
                <Button
                  variant="btn btn-dark"
                  className="w-10"
                  onClick={() => increaseQuantity(drink?.idDrink)}
                >
                  + Lägg i varukorgen
                </Button>
              ) : (
                <div
                  className="d-flex justify-content-between flex-row"
                  style={{ gap: "0.5rem" }}
                >
                  <div
                    style={{ width: "18rem", height: "2.5rem" }}
                    className="d-flex justify-content-between bg-dark text-white rounded"
                  >
                    <Button
                      style={{ width: "2.5rem" }}
                      variant="btn btn-dark"
                      onClick={() => decreaseQuantity(drink?.idDrink)}
                    >
                      <span className="fw-bold">-</span>
                    </Button>
                    <div>
                      <span className="fs-4">{quantity}</span> st. i varukorgen
                    </div>
                    <Button
                      style={{ width: "2.5rem" }}
                      variant="btn btn-dark"
                      onClick={() => increaseQuantity(drink?.idDrink)}
                    >
                      <span className="fw-bold">+</span>
                    </Button>
                  </div>

                  <Button
                    style={{ width: "6rem", height: "2.5rem" }}
                    variant="danger"
                    onClick={() => removeItem(drink?.idDrink)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}



{/* <div
className="d-flex align-items-center justify-content-center"
style={{ gap: "1rem" }}
>
<Button
  onClick={handleBackwardClick}
  variant="btn btn-light"
  className="mt-4 rounded-0 rounded-start"
  style={{translate:'1.3rem -0.75rem', height:'25.1rem'}}
>
  <BsArrowLeft size={25} />
</Button>
<Card.Img
  src={drink?.strDrinkThumb}
  height="400rem"
  style={{ objectFit: "cover", boxShadow:'0px 0px 20px 1px'}}
/>
<Button
  onClick={handleForwardClick}
  variant="btn btn-light"
  className="mt-4 rounded-0 rounded-end"
  style={{translate:'-1.3rem -0.75rem', height:'25.1rem'}}
>
  <BsArrowRight size={25} />
</Button>
</div> */}