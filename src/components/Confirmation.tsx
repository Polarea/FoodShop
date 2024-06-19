import { Modal, Stack } from "react-bootstrap";
import { formatCurrency } from "../utilities/CurrencyFormatter";
import { useCart } from "../contexts/CartContext";
import { ConfirmationItem } from "./ConfirmationItem";

function Confirmation() {
    const {open, isConfirmationOpen, isProcessingOpen, cart, clearCart } = useCart();

    function Processing(){
      setTimeout(() => {
        open(false, 'processing','');
      }, 5000);
    }

  return (
    <Modal show={isConfirmationOpen} onHide={() => {open(false, "confirmation", ""); clearCart();}}>
      {isProcessingOpen ? 
      <>
      {Processing()}
      <div className="processing mx-auto mb-2 fs-3 fw-bold">Beställningen bearbetas...</div>
      <div className="spinner-border mx-auto mb-2" role="status"></div>
      </> : 
      <>
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
          return total + ((cartItem.price || 49) * cartItem.quantity);
        }, 0) 
      )}`}
    </div>
    </Stack>
    </Modal.Body> 
    </>}
    </Modal>
  )
}

export default Confirmation