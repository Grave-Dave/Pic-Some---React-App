import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {Context} from './userContext'

function Header() {

	const {cartItems} = useContext(Context) 

	function cartIcon(){
		if (cartItems.length > 0){
			return <i className='ri-shopping-cart-fill ri-fw ri-2x'></i>
		} else{
			return <i className='ri-shopping-cart-line ri-fw ri-2x'></i>
		}
	}
	return (
		<header>
			<Link to='/'>
				<h2>Pic Some</h2>
			</Link>
            <Link to='/cart'>
			    {cartIcon()}
            </Link>
		</header>
	);
}

export default Header;
