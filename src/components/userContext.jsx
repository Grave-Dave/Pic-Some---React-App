import { element } from 'prop-types';
import React from 'react';
import { useEffect, useState } from 'react';
import CartItem from './CartItem';

const Context = React.createContext();

function userContext(props) {

    const [photos, setPhotos] = useState([])
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('addedToChart')) || [])
    const [cost, setCost] = useState(0)
    const [isOrdering, setIsOrdering] = useState(false)
    const [savedFavorites, setSavedFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [])

    function toggleFavorite(id) {
        setPhotos(prevPhotos=>(
            prevPhotos.map(photoItem=>(
                photoItem.id === id ?
                {
                ...photoItem,
                isFavorite: !photoItem.isFavorite
                } :
                photoItem
            ))
        ))
    }

    function addToCart(photo) {
        setCartItems(prevCart=>(
            [...prevCart, photo]
        ))
    }

    function removeFromChart(photo) {
        setCartItems(prevChart=>(
            prevChart.filter(item=>{
                if(item.id !== photo.id){
                    return photo
                } 
            })
        ))
    }

    function takeOrder(){
        setIsOrdering(true)
        setTimeout(() => {
            setIsOrdering(false)
            setCartItems([])
            alert('Order placed!')
        }, 3000);
    }

    useEffect(()=>{
        setCost ((cartItems.length*5.99).toLocaleString("en-US", {style: "currency", currency: "USD"}))
        localStorage.setItem('addedToChart', JSON.stringify(cartItems));
    }, [cartItems])   

    useEffect(()=>{
        fetch('https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json')
            .then(res=>res.json())
            .then(data=>{
                const newData = data.map(element=>{
                    
                    if(savedFavorites.some(fav => fav.id === element.id)){
                        return{
                            ...element,
                            isFavorite: true
                        }
                    } else{
                        return element
                    }
                })
                
                setPhotos(newData)})      

           
        },[])
        
        useEffect(()=>{     
            
            const favorites = photos.filter(photo=>{
                if(photo.isFavorite){
                    return photo
                }
            })
            localStorage.setItem('favorites', JSON.stringify(favorites));
        },[photos])

	return (
        <Context.Provider value={{
            photos,
            cartItems,
            cost,
            toggleFavorite,
            addToCart,
            removeFromChart,
            isOrdering,
            takeOrder
        }}>
            {props.children}
        </Context.Provider>
        )
}

export { userContext as UserContextProvider, Context};
