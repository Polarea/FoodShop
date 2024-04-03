import { Button, Offcanvas, Stack } from "react-bootstrap";
import { formatCurrency } from "../utilities/CurrencyFormatter";
import { useCart } from "../contexts/CartContext";
import { CartItem } from "./CartItem";

export default function Cart() {
  const { open, isCartOpen, cart, menu, drinks } = useCart();

  function drinksInCart(){
    const drinksQuantity = cart.reduce((drinksTotal, cartItem) => {
      const drink = drinks.drinks.find(_drink => _drink.idDrink === cartItem.id);
      if (drink != null) { return drinksTotal + 1;} return drinksTotal;
    } ,0); return drinksQuantity;
  }
  function orderButton(){
    open(false, 'cart', '');
    if (drinksInCart() == 0){      
      open(true, 'cocktail', '');
    }
    else{
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
                const _menu = menu.find((i) => i._id === cartItem.id);
                 const item = _menu ? _menu : drinks.drinks.find(drink => drink.idDrink === cartItem.id);
                return total + ((item?.price || 49) * cartItem.quantity);
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
