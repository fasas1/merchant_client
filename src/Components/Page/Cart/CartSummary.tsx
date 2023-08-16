import React from 'react'
import { useSelector } from 'react-redux'
import { cartItemModel } from '../../../Interfaces'
import { RootState } from '../../../Storage/Redux/store'



function CartSummary() {
     const shoppingCartFromStore : cartItemModel[] = useSelector(
        (state: RootState) =>  state.shoppingCartStore.cartItems ?? []
     )

    if(!shoppingCartFromStore){
        return <div>Cart Empty</div>
    }

  return ( 
      <div>
     {shoppingCartFromStore.map((cartItem: cartItemModel, index: number) =>(
<div>hhs</div>
     ))}
    </div>
  )
}

export default CartSummary