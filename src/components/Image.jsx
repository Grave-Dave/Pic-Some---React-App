import React, { useState, useContext } from 'react';
import {Context} from '../components/userContext'
import PropTypes from 'prop-types'
import useHover from '../hooks/useHover';

function Image({photo, className}) {
    const {toggleFavorite, addToCart, cartItems, removeFromChart} = useContext(Context)

    // const [hovered, setHovered] = useState(false);

	const [hovered, ref] = useHover()

    const heartIcon = photo.isFavorite ? 
            <i onClick={()=>toggleFavorite(photo.id)} className='ri-heart-fill favorite'></i>
            : hovered && <i onClick={()=>toggleFavorite(photo.id)} className='ri-heart-line favorite'></i>
            
    const cartIcon = cartItems.some(item=>item.id === photo.id) ? 
			<i onClick={()=>removeFromChart(photo)} className="ri-shopping-cart-fill cart"></i> 
			: hovered && <i onClick={()=>addToCart(photo)} className='ri-add-circle-line cart'></i>

     return (
		<div
			ref={ref}
			className={`${className} image-container`}
			// onMouseEnter={() => setHovered(true)}
			// onMouseLeave={() => setHovered(false)}
			>
			<img src={photo.url} className='image-grid' alt='random image' />
			{heartIcon}
			{cartIcon}
		</div>
	);
} 

Image.propTypes={
	className: PropTypes.string,
	photo: PropTypes.shape({
		id:PropTypes.string.isRequired,
		url:PropTypes.string.isRequired,
		isFavorite:PropTypes.bool
	})
}

export default Image;
