import { Button, Offcanvas, Stack } from "react-bootstrap";
import { formatCurrency } from "../utilities/CurrencyFormatter";
import { useCart } from "../contexts/CartContext";
import { CartItem } from "./CartItem";
import { useState } from "react";

export default function Cart() {
  const { open, isCartOpen, cart } = useCart();

  const [tips, setTips] = useState(0);

  function drinkExistsInCart() {
    if (cart.find(item => item.productType === "drink")){
      return true
    }
    if (tips < 1){
      setTips(1);
      return false
    }
    return true
  }

  function orderButton(){
    open(false, 'cart', '');
    if (!drinkExistsInCart()){      
      open(true, 'cocktail', '');
    }
    else{     
      setTips(0);
      open(true, 'processing', ''); 
      open(true, 'confirmation', '');
    }
  }

  return (
    <Offcanvas
      show={isCartOpen}
      onHide={() => open(false, "cart", "")}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Varukorgen</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cart.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            {`Total ${formatCurrency(
              cart.reduce((total, cartItem) => {
                return total + ((cartItem.price || 49) * cartItem.quantity);
              }, 0) 
            )}`}
          </div>
          <Button onClick={orderButton}
            variant="btn btn-dark fw-bold"
            style={{
              width: "6rem",
              alignSelf: "center",
              letterSpacing: "0.1rem",
            }}
          >
            Beställ
          </Button>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
