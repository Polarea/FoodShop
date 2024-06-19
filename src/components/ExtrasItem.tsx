import { Button, Card } from "react-bootstrap";
import { Meal, ShoppingCart, useCart } from "../contexts/CartContext";
import { formatCurrency } from "../utilities/CurrencyFormatter";

export function ExtrasItem(item: Meal) {
    const { removeItem, increaseQuantity, decreaseQuantity, getQuantity } =
      useCart();
    const quantity = getQuantity(item.idMeal);
    const cartItem : ShoppingCart = {
      id :  item.idMeal,
      name : item.strMeal,
      imageUrl : item.strMealThumb,
      price : 99,
      quantity : quantity,
      productType : "extras"
      }
    return (
      <Card className="h-100 mt-3 shadow-sm">
        <Card.Img
          variant="top"
          src={cartItem.imageUrl}
          height="200rem"
          style={{ objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-baseline">
            <span className="fs-4">{cartItem.name}</span>{" "}
            <span className="ms-2 text-muted">{formatCurrency(cartItem.price)}</span>
          </Card.Title>
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
                  className="d-flex text-white rounded"
                >
                  <Button
                    style={{ width: "2.5rem" }}
                    variant="btn btn-outline-dark" className="rounded-0 rounded-start"
                    onClick={() => decreaseQuantity(cartItem.id)}
                  >
                    <span className="fw-bold">-</span>
                  </Button>
                  <div className="bg-dark ps-2 pe-2">
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
                  onClick={() => removeItem(cartItem.id)}
                >
                  Ta Bort
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  }
  