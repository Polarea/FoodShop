import { useState } from "react";
import { Card, Button, Row, Col, Carousel} from "react-bootstrap";
import { Cocktails, ShoppingCart, useCart } from "../contexts/CartContext";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { formatCurrency } from "../utilities/CurrencyFormatter";

const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php";

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
  const handelSelect = (selectedIndex : number) => {setIndex(selectedIndex); }
  const quantity = getQuantity(selectedDrinks.drinks[index].idDrink);

  const cartItem : ShoppingCart = {
    id :  selectedDrinks.drinks[index].idDrink,
    name : selectedDrinks.drinks[index].strDrink,
    imageUrl : selectedDrinks.drinks[index].strDrinkThumb,
    price : 59,
    quantity : quantity,
    productType : "drink"
    }

  async function fetchDrinks(patchUrl : string){

    const response = await fetch(baseUrl + patchUrl);
    const fetchedDrinks = (await response.json()) as Cocktails;
    setSelectedDrinks(fetchedDrinks);
  }

  return (
    <Card key={selectedDrinks.drinks[index].idDrink} className="text-align-center mt-3">
      <Card.Body>
        <Row className="d-flex flew-row" xs={1} md={1} lg={2}>
          <Col className="flex-column">
            <Carousel pause="hover" activeIndex={index} onSelect={handelSelect} nextIcon={<Button
            variant="btn btn-light"
            className="mt-4 rounded-0 rounded-end float-end"
            style={{translate:'0rem -0.7rem', height:'25rem'}}
            >
            <BsArrowRight size={25} />
            </Button>} prevIcon={<Button
            variant="btn btn-light"
            className="mt-4 rounded-0 rounded-start float-start"
            style={{translate:'0rem -0.7rem', height:'25rem'}}
            >
            <BsArrowLeft size={25} />
            </Button>} fade>
            {selectedDrinks.drinks.map(drink => {
              return (
                <Carousel.Item>
            <img src={drink.strDrinkThumb} key={drink.idDrink} className="object-fit-scale border rounded w-100" style={{height:'25rem'}}/>
            </Carousel.Item>
              );
            })}
            </Carousel>
          </Col>
          <Col className="d-flex flex-column">
          <div className="ms-1 btn-group d-flex justify-content-between w-100" role="group">
            <Button type="button" className="rounded-0 rounded-start border btn btn-light btn-outline-dark fw-bold" onClick={()=>fetchDrinks("?a=Alcoholic")}>Alkohol</Button>
            <Button type="button" className="border btn btn-light btn-outline-dark fw-bold" onClick={()=>fetchDrinks("?a=Non_Alcoholic")}>Alkoholfri</Button>
            <Button type="button" className="rounded-0 rounded-end border btn btn-light btn-outline-dark fw-bold" onClick={()=>fetchDrinks("?c=Coffee_/_Tea")}>Kaffe / Te</Button>
            </div>
            <Card.Title className="mt-1 text-center fs-4"
              style={{
                letterSpacing: "0.5rem",
                textShadow: "1px 1px 10px",
                height: "3.5rem",
                overflow: "hidden"
              }}
            >
              {selectedDrinks.drinks[index].strDrink}
            </Card.Title>
            <Row className="d-flex">
              <div className="mb-2 fs-5 fw-bold text-center text-muted">{formatCurrency(59)}</div>
              <div className="d-flex justify-content-center">
                {quantity === 0 ? (
                  <Button
                    variant="btn btn-dark"
                    className="w-10 mb-3"
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
                      style={{ width: "14rem", height: "2.5rem" }}
                      className="d-flex justify-content-between bg-dark text-white rounded"
                    >
                      <Button
                        style={{ width: "2rem" }}
                        variant="btn btn-outline-dark bg-white rounded-0 rounded-start"
                        onClick={() => decreaseQuantity(selectedDrinks.drinks[index].idDrink)}
                      >
                        <span className="fw-bold">-</span>
                      </Button>
                      <div>
                        <span className="fs-4">{quantity}</span> st. i varukorgen
                      </div>
                      <Button
                        style={{ width: "2rem" }}
                        variant="btn btn-outline-dark bg-white rounded-0 rounded-end"
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
            </Row>
            </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

            {/* <Row className="d-flex justify-content-center border-top-0 border ms-1 h-60 flew-row w-100 h-100 rounded-bottom" xs={3} md={2} lg={3}>
                      {selectedDrinks.drinks.slice(index, index + 6).map(drink => {
                        return (
                          <Col className="flex-column">
                  <img src={drink.strDrinkThumb} style={{width:"7rem", margin:"0.5rem", borderRadius:"0.2rem"}}/>
                  <p className="text-center fw-bold text-muted h-5">{drink.strDrink}</p>
                  </Col>
                        )})}            

              </Row> */}
          


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