import React, { useEffect, useState } from 'react'
import "./css/Card.css"
import Emphase from '../../components/htmlFormater/Emphase';
import { Link } from 'react-router-dom';
import ButtonAddToCard from '../../components/buttons/ButtonAddToCard';
import ProductFunctions from '../../functions/ProductFunctions';

function Card({ product, addProductToCart, productsInCart, itemsNum, isFilter, keywords }) {

    const [isInCart, setIsInCart] = useState(false);

    // setIsInCart(ProductFunctions.thisProductIsInTheCart(product, productsInCart))
    const addToCart = () => {
        setIsInCart(true)
        addProductToCart(product);
    };

    useEffect(
        () => {
            setIsInCart(ProductFunctions.thisProductIsInTheCart(product, productsInCart))
        }, []
    )

    return (
        <>
            {/* {
                ProductFunctions.thisProductIsInTheCartForJSX(product, productsInCart, setIsInCart)
            } */}
            <section className='card'>
                <img className='card-product-image' src={product.image} />
                <h2 className='card-product-title'><Emphase content={product.title} isFilter={isFilter} keywords={keywords} /></h2>
                <p className='card-product-price'>${product.price}</p>
                <div className='btn-container-cart'>
                    <Link to={`/product/${product.id}`}>
                        <button className='btn btn-card btn-secondary btn-view'>View</button>
                    </Link>
                    <ButtonAddToCard addToCart={addToCart} product={product} isInCart={isInCart} setIsInCart={setIsInCart} />
                </div>
            </section>
        </>
    )
}

export default Card