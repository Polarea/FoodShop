import { Button, Card, Col, Modal, Row} from "react-bootstrap"
import { useCart } from "../contexts/CartContext"
import { Link } from "react-router-dom";


function CocktailModal() {
    const {drinks, open, isCocktailOpen, getQuantity, increaseQuantity, decreaseQuantity, removeItem} = useCart(); 
    const drink = drinks.drinks[0]; 
    const quantity = getQuantity(drink?.idDrink);
  return (
    
    <Modal show={isCocktailOpen} onHide={()=>open(false, "cocktail", '')}>
        <div className="text-muted fs-5 mt-2 text-center">Vill du lägga till</div> <div style={{fontSize:'2rem', textAlign:'center',
                letterSpacing: "0.5rem",
                textShadow: "1px 1px 10px",
              }}>{drink?.strDrink}</div>
    <Card key={drink?.idDrink} className="text-align-center mt-3">
      <Card.Body>
        <Col className="w-100 h-100">
          <Row className="w-100 h-75">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ gap: "1rem"}}
            >
                 <Card.Img
                src={drink?.strDrinkThumb}
                style={{ objectFit: "contain", boxShadow:'0px 0px 20px 1px'}}
              />
              </div>
              </Row>
          <Row className="w-100 h-25">
            <div className="mb-3 fs-5">{drink?.price}</div>
            <div className="mb-3 fs-5">{drink?.quantity}</div>
            <div className="mt-auto mb-3">
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
            <Link className="btn btn-dark" to='/cocktails' onClick={()=>{open(false, "cocktail", "")}}>Till Cocktails</Link>
          </Row>
        </Col>
      </Card.Body>
    </Card>
    </Modal>
  )
}

export default CocktailModal