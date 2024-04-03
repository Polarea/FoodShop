import { Modal, Stack } from "react-bootstrap";
import { formatCurrency } from "../utilities/CurrencyFormatter";
import { useCart } from "../contexts/CartContext";
import { ConfirmationItem } from "./ConfirmationItem";



function Confirmation() {
    const {open, isConfirmationOpen, cart, clearCart, menu, drinks } = useCart();
  return (
    <Modal show={isConfirmationOpen} onHide={() => {open(false, "confirmation", ""); clearCart();}}>
      <Modal.Header closeButton>
        <Modal.Title className="fs-3 align-self-center">Tack för din beställning!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
    <Stack gap={3}>
    {cart.map((item) => (
      <ConfirmationItem key={item.id} {...item} />
    ))}
    <div className="ms-auto fw-bold fs-5">
      {`Total ${formatCurrency(
        cart.reduce((total, cartItem) => {
          const _menu = menu.find((i) => i._id === cartItem.id);
           const item = _menu ? _menu : drinks.drinks.find(drink => drink.idDrink === cartItem.id);
          return total + ((item?.price || 49) * cartItem.quantity);
        }, 0) 
      )}`}
    </div>
    </Stack>
    </Modal.Body>
    </Modal>
  )
}

export default Confirmation