import { useState } from "react";
import { Card, Button, Row, Col, Carousel} from "react-bootstrap";
import { Cocktails, ShoppingCart, useCart } from "../contexts/CartContext";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default function Cocktail() {
  const {
    drinks,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    getQuantity,
  } = useCart();
  
  const [index, setIndex] = useState(10);
  const [selectedDrinks, setSelectedDrinks] = useState(drinks);
  const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php";
  const handelSelect = (selectedIndex : number) => {setIndex(selectedIndex); }
  const quantity = getQuantity(selectedDrinks.drinks[index].idDrink);
  const cartItem : ShoppingCart = {
    id :  selectedDrinks.drinks[index].idDrink,
    name : selectedDrinks.drinks[index].strDrink,
    imageUrl : selectedDrinks.drinks[index].strDrinkThumb,
    price : 59,
    quantity : quantity
    }

  async function fetchDrinks(patchUrl : string){

    const response = await fetch(baseUrl + patchUrl);
    const fetchedDrinks = (await response.json()) as Cocktails;
    setSelectedDrinks(fetchedDrinks);
  }

  return (
    <Card key={selectedDrinks.drinks[index].idDrink} className="text-align-center mt-3">
      <Card.Body>
        <Row className="d-flex flew-row" xs={1} md={2} lg={2}>
          <Col className="flex-column">
          <Carousel pause="hover" activeIndex={index} onSelect={handelSelect} nextIcon={<Button
            variant="btn btn-light"
            className="mt-4 rounded-0 rounded-end"
            style={{translate:'1.5rem -0.75rem', height:'43.7rem'}}
            >
            <BsArrowRight size={25} />
            </Button>} prevIcon={<Button
            variant="btn btn-light"
            className="mt-4 rounded-0 rounded-start"
            style={{translate:'-1.5rem -0.75rem', height:'43.7rem'}}
            >
            <BsArrowLeft size={25} />
            </Button>} fade>
            {selectedDrinks.drinks.map(drink => {
              return (
                <Carousel.Item>
            <img src={drink.strDrinkThumb} key={drink.idDrink} className="rounded"/>
            <p>{drink.strDrink}</p>
            </Carousel.Item>
              );
            })}
      
    </Carousel>
          </Col>
          <Col className="flex-column">
           <div className="btn-group d-flex justify-content-between" role="group">
            <Button type="button" className="btn btn-light btn-outline-dark fw-bold" onClick={()=>fetchDrinks("?a=Alcoholic")}>Alkohol</Button>
            <Button type="button" className="btn btn-light btn-outline-dark fw-bold" onClick={()=>fetchDrinks("?a=Non_Alcoholic")}>Alkoholfri</Button>
            <Button type="button" className="btn btn-light btn-outline-dark fw-bold" onClick={()=>fetchDrinks("?c=Coffee_/_Tea")}>Kaffe / Te</Button>
            </div>
            <Card.Title className="mt-3"
              style={{
                letterSpacing: "0.5rem",
                textShadow: "1px 1px 10px",
              }}
            >
              {selectedDrinks.drinks[index].strDrink}
            </Card.Title>
            <div className="mb-3 fs-5">{selectedDrinks.drinks[index].price}</div>
            <div className="mb-3 fs-5">{selectedDrinks.drinks[index].quantity}</div>
            <div className="mt-auto">
              {quantity === 0 ? (
                <Button
                  variant="btn btn-dark"
                  className="w-10"
                  onClick={() => increaseQuantity(cartItem)}
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
                      onClick={() => decreaseQuantity(selectedDrinks.drinks[index].idDrink)}
                    >
                      <span className="fw-bold">-</span>
                    </Button>
                    <div>
                      <span className="fs-4">{quantity}</span> st. i varukorgen
                    </div>
                    <Button
                      style={{ width: "2.5rem" }}
                      variant="btn btn-dark"
                      onClick={() => increaseQuantity(cartItem)}
                    >
                      <span className="fw-bold">+</span>
                    </Button>
                  </div>

                  <Button
                    style={{ width: "6rem", height: "2.5rem" }}
                    variant="danger"
                    onClick={() => removeItem(selectedDrinks.drinks[index].idDrink)}
                  >
                    Ta Bort
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