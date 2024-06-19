import { Button, Card, Col, Modal, Row} from "react-bootstrap"
import { ShoppingCart, useCart } from "../contexts/CartContext"
import { Link } from "react-router-dom";
import { formatCurrency } from "../utilities/CurrencyFormatter";


function CocktailModal() {
    const {drinks, open, isCocktailOpen, getQuantity, increaseQuantity, decreaseQuantity, removeItem} = useCart(); 
    const drinkIndex = Math.floor(Math.random() * 20 - 1) + 1;
    const drink = drinks.drinks[drinkIndex]; 
    const quantity = getQuantity(drink?.idDrink);
    const cartItem : ShoppingCart = {
      id :  drink?.idDrink,
      name : drink?.strDrink,
      imageUrl : drink?.strDrinkThumb,
      price : 59,
      quantity : quantity,
      productType : "drink"
      }
  return (
    
    <Modal show={isCocktailOpen} onHide={()=>open(false, "cocktail", '')}>
        <Modal.Header closeButton></Modal.Header>
        <div className="text-muted fs-5 text-center">Vill du lägga till</div> 
        <div style={{fontSize:'2rem', textAlign:'center',
                letterSpacing: "0.5rem",
                textShadow: "1px 1px 10px",
              }}>{drink?.strDrink}</div>
    <Card key={drink?.idDrink}>
      <Card.Body>
        <Col className="w-100 h-100">
          <Row className="w-100 h-75">
            <div
              className="ms-2"
              style={{ gap: "1rem"}}
            >
                 <Card.Img
                src={drink?.strDrinkThumb}
                style={{ objectFit: "contain", boxShadow:'0px 0px 20px 1px'}}
              />
              </div>
              </Row>
          <Row className="w-100 h-25">
            <div className="m-1 fs-5 fw-bold">{formatCurrency(59)}</div>
            <div className="mt-auto mb-3">
              
              {quantity === 0 ? (
                <div className="d-flex justify-content-between">
                  <Button
                    variant="btn btn-dark"
                    className="w-10"
                    onClick={() => increaseQuantity(cartItem)}
                  >
                    + Lägg i varukorgen
                  </Button> <Link className="btn btn-dark" to='/cocktails' onClick={()=>{open(false, "cocktail", "")}}>Till Cocktails</Link>
                </div>
              ) : (
                <div className="w-100">
                  <div
                    className="d-flex justify-content-between flex-row"
                    style={{ gap: "0.5rem" }}
                  >
                    <div
                      style={{ width: "18rem", height: "2.5rem" }}
                      className="d-flex text-white rounded"
                    >
                      <Button
                        style={{ width: "2.5rem"}}
                        variant="btn btn-outline-dark" className="rounded-0 rounded-start"
                        onClick={() => decreaseQuantity(drink?.idDrink)}
                      >
                        <span className="fw-bold">-</span>
                      </Button>
                      <div className="bg-dark ps-3 pe-3">
                        <span className="fs-4">{quantity}</span> st. i varukorgen
                      </div>
                      <Button
                        style={{ width: "2.5rem" }}
                        variant="btn btn-outline-dark" className="rounded-0 rounded-end"
                        onClick={() => increaseQuantity(cartItem)}
                      >
                        <span className="fw-bold">+</span>
                      </Button> 
                    </div>
                    <Button
                      style={{ width: "6rem", height: "2.5rem" }}
                      variant="outline-danger"
                      onClick={() => removeItem(drink?.idDrink)}
                    >
                      Ta Bort
                    </Button>
                  </div>
                  <div className="mt-3 d-flex justify-content-center"><Link className="btn btn-dark fw-bold" style={{width:'26rem'}} to='/cocktails' onClick={()=>{open(false, "cocktail", "")}}>Till Cocktails</Link></div>
                </div>
                
              )}
            </div>
            
          </Row>
        </Col>
      </Card.Body>
    </Card>
    </Modal>
  )
}

export default CocktailModal