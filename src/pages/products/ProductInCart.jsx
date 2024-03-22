import React from 'react'
import Card from './Card'
import './css/Product.css'
import Loader from '../../components/loader/Loader'
import CardInCart from './CardInCart'
import { VscEmptyWindow } from "react-icons/vsc";
import { NavLink } from 'react-router-dom'
import TotalPrice from './TotalPrice'
import FormForValidationCart from './FormForValidationCart'
import ConfirmCancelPurchase from '../../components/popups/ConfirmCancelPurchase'


function ProductInCart({ isLoading, addProductToCart, productsInCart, itemsNum, itemsCountList, addItemsCountList, removeItemsCountList, setValideCart, valideCart, cancelPurchase, setProductsInCart, setItemsNum, setItemsCountList, wantConfirmPurchase, setWantConfirmPurchase, setCookieData }) {
    const cartInfo  = {}
    if (valideCart) {
        // console.log('Mandalo')
        cartInfo['cart'] = {}
        cartInfo.cart['items'] = []
        for (let product of productsInCart) {
            cartInfo.cart.items.push({...product, ...{quantity: itemsCountList[product.id]}, ...{amount: (product.price * parseInt(itemsCountList[product.id]))}})
        }
        cartInfo.cart['total'] = (productsInCart.map(p => p.price * parseInt(itemsCountList[p.id])).reduce((acc, amountItem) => (acc + amountItem), 0)).toFixed(2);
    }
    
    return (
        <>
            {
                isLoading && <Loader />
            }

            {
                valideCart && <FormForValidationCart setValideCart={setValideCart} cartInfo={cartInfo} setProductsInCart={setProductsInCart} setItemsNum={setItemsNum} setItemsCountList={setItemsCountList} itemsCountList={itemsCountList} />
            }

            {
                wantConfirmPurchase && <ConfirmCancelPurchase itemsCountList={itemsCountList} textContent={'Are sure to delete all items in cart ?'} setWantConfirmPurchase={setWantConfirmPurchase} setProductsInCart={setProductsInCart} setItemsNum={setItemsNum} setItemsCountList={setItemsCountList} setCookieData={setCookieData} />
            }
            <article className='products-list-container'>

                <section className='total-price-main-section'>
                    <div className='container'>

                        {
                            (productsInCart.length > 0 && productsInCart.every((value) => (value != undefined || value != null))) ?
                                <TotalPrice productsInCart={productsInCart} itemsCountList={itemsCountList} itemsNum={itemsNum} setValideCart={setValideCart} cancelPurchase={cancelPurchase} setProductsInCart={setProductsInCart} setItemsNum={setItemsNum} setItemsCountList={setItemsCountList} setCookieData={setCookieData} wantConfirmPurchase={wantConfirmPurchase} setWantConfirmPurchase={setWantConfirmPurchase} />
                                : ''
                        }
                    </div>
                </section>
                <section className='products-list-section'>
                    
                        {/* {console.log("product in cart")}
                {console.log(productsInCart)} */}
                        {
                            (productsInCart.length > 0 && productsInCart.every((value) => (value != undefined || value != null))) ?
                                productsInCart.map( product => <CardInCart setItemsCountList={setItemsCountList} product={product} key={product.id} addProductToCart={addProductToCart} productsInCart={productsInCart} itemsNum={itemsNum} itemsCountList={itemsCountList} addItemsCountList={addItemsCountList} removeItemsCountList={removeItemsCountList} setProductsInCart={setProductsInCart} setItemsNum={setItemsNum} setCookieData={setCookieData} />)
                                : <h1 className='absolute-element-center flex-column'><NavLink to={"/"} className='flex-column d-flex justify-content-center align-items-center'><VscEmptyWindow />Add some products</NavLink></h1>
                        }
                    
                </section>

            </article>
        </>
    )
}

export default ProductInCart