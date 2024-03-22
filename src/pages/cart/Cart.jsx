import React, { useState } from 'react'
import ProductInCart from '../products/ProductInCart'
import Loader from '../../components/loader/Loader'

function Cart({ productsInCart, isLoading, addProductToCart, itemsNum, itemsCountList, addItemsCountList, removeItemsCountList, setValideCart, valideCart, cancelPurchase, setProductsInCart, setItemsNum, setItemsCountList, setCookieData }) {
  const [wantConfirmPurchase, setWantConfirmPurchase] = useState(false);
  

  return (
    <>
      {isLoading && <Loader />}
      <main>

        <ProductInCart productsInCart={productsInCart} isLoading={isLoading} addProductToCart={addProductToCart} itemsNum={itemsNum} itemsCountList={itemsCountList} addItemsCountList={addItemsCountList} removeItemsCountList={removeItemsCountList} setValideCart={setValideCart} valideCart={valideCart} cancelPurchase={cancelPurchase} setProductsInCart={setProductsInCart} setItemsNum={setItemsNum} setItemsCountList={setItemsCountList} setCookieData={setCookieData} wantConfirmPurchase={wantConfirmPurchase} setWantConfirmPurchase={setWantConfirmPurchase} />

      </main>
    </>
  )
}

export default Cart