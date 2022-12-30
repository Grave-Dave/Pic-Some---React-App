import React, {useContext, useState} from "react";
import { Context } from "./userContext";
import PropTypes from "prop-types"

function CartItem({item}) {

    const [hovered, setHovered] = useState(false)
    const {removeFromChart} = useContext(Context)

   function trashIcon(){
        if (hovered){
            return "ri-delete-bin-fill"
        } else {
            return "ri-delete-bin-line"
        }
    }
    return(
        <div className="cart-item">
            <i 
            onClick = {()=>removeFromChart(item)}
            className= {trashIcon()}
            onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}            
            ></i>
            <img src={item.url} width="300px" />
            <p>$5.99</p>
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.shape({
        url: PropTypes.string.isRequired
    })
}

export default CartItem