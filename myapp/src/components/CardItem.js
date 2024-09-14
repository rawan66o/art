import React from 'react'
import { Button, Stack } from 'react-bootstrap'
// import StoreItems from "../data/StoreItems.json";
import { useSoppingCart } from '../context/ShoppingCartContext';

const CardItem = ({ id, quantity }) => {
    const { removeFromCart, posts } = useSoppingCart();

  const item = posts.find((i) => i.id === id)

  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={2} className='d-flex align-items-center'>
      <img src={item.image} alt='img-cart'
        style={{
          width: "125px",
          height: "75px",
          objectFit: "cover"
        }} />
      <div className='me-auto'>
        <div>
          {item.name}{"  "}
          {quantity > 1 && (<span className='text-muted' style={{ fontSize: "0.65rem" }}>x{quantity}</span>)}
          <div className='text-muted' style={{ fontSize: "0.75rem" }}>{item.name}</div>
        </div>
        {/* <div>{FormatCurrency(item.price * quantity)}</div> */}
      </div>
      <div>{item.price * quantity}</div>
      <Button variant='outline-danger' size='sm'
        onClick={() => removeFromCart(id)}
      >&times;</Button>
    </Stack>
  )
}

export default CardItem