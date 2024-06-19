import { Modal, Card, Button } from "react-bootstrap";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { ShoppingCart, useCart } from "../contexts/CartContext";
import { useState } from "react";

export default function MenuModal() {
  const {
    open,
    isMenuOpen,
    menu,
    index,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    getQuantity,
  } = useCart();

  // const itemIndex = useRef(index);
  const [item, setItem] = useState(menu[index + 1]);
  const quantity = getQuantity(item.idMeal);
  const cartItem : ShoppingCart = {
    id :  item.idMeal,
    name : item.strMeal,
    imageUrl : item.strMealThumb,
    price : 59,
    quantity : quantity
    }

  const handleForwardClick = () => {
    if (index < menu.length - 1) {
      setItem(menu[index + 1]);
    }
  };

  const handleBackwardClick = () => {
    if (index > 0) {
      setItem(menu[index - 1]);
    }
  };

  return (
    <Modal show={isMenuOpen} onHide={() => open(false, "menu", "")}>
      <Modal.Header closeButton>
        <Modal.Title className="fs-4">{item.strMeal}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card key={item.idMeal} style={{ textAlign: "center" }}>
          <Card.Body>
            <Card.Img
              src={item.strMealThumb}
              height="400rem"
              style={{ objectFit: "contain" }}
            />
            <div className="mt-auto">
              {quantity === 0 ? (
                <Button
                  variant="btn btn-dark"
                  className="w-100"
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
                      onClick={() => decreaseQuantity(item.idMeal)}
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
                    onClick={() => removeItem(item.idMeal)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ gap: "1rem" }}
            >
              <Button
                onClick={handleBackwardClick}
                variant="outline-secondary"
                className="mt-4"
              >
                <BsArrowLeft />
              </Button>
              <Button
                onClick={handleForwardClick}
                variant="outline-secondary"
                className="mt-4"
              >
                <BsArrowRight />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}
