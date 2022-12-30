import React, {useContext} from "react"
import { Context } from "../components/userContext"
import CartItem from "../components/CartItem"

function Cart() {
    const {cartItems, cost, isOrdering, takeOrder} = useContext(Context)

    const addedItems = cartItems.map(item=>(
        <CartItem key = {item.id} item={item} />
    ))
    
    const btnValue = isOrdering ? 'Ordering...' : 'Place Order'

    return (
        <main className="cart-page">
            <h1>Check out</h1>
            {addedItems}
            <p className="total-cost">Total: {cost}</p>
            <div className="order-button">
                <button disabled={!cartItems.length > 0 && true} onClick={takeOrder}>{btnValue}</button>
            </div>
        </main>
    )
}

export default Cart 