import { Stack} from "react-bootstrap";
import { useCart } from "../contexts/CartContext";
import { formatCurrency } from "../utilities/CurrencyFormatter";

type cartItem = {
    id: string;
    quantity: number;
  };
  export function ConfirmationItem({ id, quantity }: cartItem) {
    const { cart} = useCart();
    // const item = menu.find((item) => item._id === id);
    // const drink = drinks.drinks.find(drink => drink.idDrink === id);
    const cartItem = cart.find(item => item.id === id);
    if (cartItem == undefined) return null;
    
    type cartValues = {
      id : string;
      title : string;
      imageUrl : string;
      price : number;
    }
    const values : cartValues = {
      id: cartItem.id,
      title: cartItem.name,
      imageUrl: cartItem.imageUrl,
      price: cartItem.price,
    };
    // if (item == null && drink != null){
    //   values.id = drink.idDrink;
    //   values.title = drink.strDrink;
    //   values.imageUrl = drink.strDrinkThumb;
    //   values.price = 49;
    // }
    
    // if (item != null && drink == null){
    //   values.id = item._id;
    //   values.title = item.title;
    //   values.imageUrl = item.imageUrl;
    //   values.price = item.price;
    // }
    return (
      <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
        <img
          src={values.imageUrl}
          style={{
            width: "8rem",
            height: "5rem",
            objectFit: "cover",
            minWidth: "8rem",
          }}
          className="rounded"
        />
        <div className="me-auto">
          <div>
            <span>{values.title} </span>
            {quantity > 0 && (
              <span
                className="text-muted me-auto"
                style={{ fontSize: "0.65rem" }}
              >
                {`x${quantity}`}
              </span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: "0.75rem" }}>
            {formatCurrency(values.price)}
          </div>
        </div>
        <div>{formatCurrency(values.price * quantity)}</div>
      </Stack>
    );
  }
  