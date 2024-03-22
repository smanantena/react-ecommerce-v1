import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

function ButtonAddToCard({ addToCart, product, isInCart, setIsInCart }) {
    const navigate = useNavigate();
    if (!isInCart) {
        return (
            <button className='btn btn-card btn-primary btn-add-to-card' onClick={addToCart}>Add to cart</button>
        )
    } else {
        return (
            // <NavLink to={`/cart#product-${product.id}`}>
            //     <button className='btn btn-card btn-primary btn-add-to-card' style={{ background: '#ddd' }} >In cart</button>
            // </NavLink>

            <button className='btn btn-card btn-primary btn-add-to-card' style={{ background: '#ddd' }} onClick={() => navigate(`/cart#product-${product.id}`)}>Is in cart</button>

        )
    }
}

export default ButtonAddToCard