import React, { useState } from 'react'
import "./css/Card.css"
import { NavLink } from 'react-router-dom';
import { IoMdCloseCircle } from "react-icons/io";
import CartFunctions from '../../functions/CartFunctions'
import HandelNumberItemValue from '../../components/popups/HandelNumberItemValue';

function CardInCart({ product, itemsCountList, setItemsCountList, addItemsCountList, removeItemsCountList, setProductsInCart, setItemsNum, productsInCart, itemsNum, setCookieData }) {
    const [editNumberItem, setEditNumberItem] = useState(false)
    const [wantToDelete, setWantToDelete] = useState(false);

    let itemLink = ''

    if (product.id) {
        itemLink = `/product/${product.id}`
    }

    const showEditNumberItem = () => {
        setEditNumberItem(true);
    }

    return (
        <>
            {editNumberItem && <HandelNumberItemValue itemsCountList={itemsCountList} setItemsCountList={setItemsCountList} itemID={product.id} setShowBool={setEditNumberItem} number={itemsCountList[product.id]} productsInCart={productsInCart} productItem={product} setItemsNum={setItemsNum} setProductsInCart={setProductsInCart} />}
            <section id={`product-${product.id}`} className={(wantToDelete) ? 'want-to-delete-item card-in-cart' : 'card-in-cart'} >
                {/* {console.log("products")} */}
                {/* {console.log("itemsCountList")} */}
                {/* {console.log(itemsCountList)} */}
                {/* {console.log(productsInCart)} */}
                <IoMdCloseCircle onMouseEnter={() => setWantToDelete(true)} onMouseLeave={() => setWantToDelete(false)} onClick={() => { CartFunctions.deleteProductItem(product, setProductsInCart, setItemsNum, productsInCart, itemsCountList, itemsNum) }} className='card-product-delete-button' />
                <NavLink className='card-product-link' to={itemLink}><img className='card-product-image' src={product.image} /></NavLink>
                <h2 className='card-product-title card-product-title-cart'>{product.title}</h2>
                <div className='card-product-price card-product-price-cart'><div className='muted-text small-text text-center'>UP: ${product.price}</div>${product.price * 100 * itemsCountList[product.id] / 100}</div>
                <div className='btn-container btn-container-cart'>
                    <button className='btn btn-remove-product btn-cart' onClick={() => { removeItemsCountList(product.id, product) }}>-</button>
                    <p className='num-item' onClick={showEditNumberItem}>{itemsCountList[product.id]}</p>
                    <button className='btn btn-add-product btn-cart' id={"add-" + product.id} onClick={() => { addItemsCountList(product.id) }}>+</button>
                </div>
            </section>
        </>
    )
}

export default CardInCart