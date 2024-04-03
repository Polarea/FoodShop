import { Button, Card } from "react-bootstrap";
import { Menu, useCart } from "../contexts/CartContext";
import { formatCurrency } from "../utilities/CurrencyFormatter";

export function MenuItem(menu: Menu) {
  const { removeItem, increaseQuantity, decreaseQuantity, getQuantity } =
    useCart();
  const quantity = getQuantity(menu._id);
  return (
    <Card className="h-100 mt-3 shadow-sm">
      <Card.Img
        variant="top"
        src={menu.imageUrl}
        height="200rem"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline">
          <span className="fs-4">{menu.title}</span>{" "}
          <span className="ms-2 text-muted">{formatCurrency(menu.price)}</span>
        </Card.Title>
        <div className="mb-3 fs-5">{menu.description}</div>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
              variant="btn btn-dark"
              className="w-100"
              onClick={() => increaseQuantity(menu._id)}
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
                  onClick={() => decreaseQuantity(menu._id)}
                >
                  <span className="fw-bold">-</span>
                </Button>
                <div>
                  <span className="fs-4">{quantity}</span> st. i varukorgen
                </div>
                <Button
                  style={{ width: "2.5rem" }}
                  variant="btn btn-dark"
                  onClick={() => increaseQuantity(menu._id)}
                >
                  <span className="fw-bold">+</span>
                </Button>
              </div>

              <Button
                style={{ width: "6rem", height: "2.5rem" }}
                variant="danger"
                onClick={() => removeItem(menu._id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
