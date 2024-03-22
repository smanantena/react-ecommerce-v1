import React, { useState } from 'react'
import Card from './Card'
import './css/Product.css'
import Loader from '../../components/loader/Loader'
import { MdSignalWifiOff } from "react-icons/md";
import CounterReload from '../../components/counters/CounterReload';

function Product({ products, isLoading, addProductToCart, productsInCart, itemsNum, isFilter, keywords, networkErrorOccured, counter, isFilterEmpty }) {
    // console.table(products)



    return (
        <article className='products-list-container'>
            {
                isLoading && <Loader />
            }
            <section className='products-list-section'>

                {
                    (products.some((value) => (value != null || value != undefined))) ?
                        products.map((product) => <Card product={product} key={product.id} addProductToCart={addProductToCart} productsInCart={productsInCart} itemsNum={itemsNum} isFilter={isFilter} keywords={keywords} />)
                        : (isFilter && !isFilterEmpty) ?
                            <div className='absolute-element-center flex-column'><h1>None product match with our search !</h1></div> : (networkErrorOccured) ? <div className='absolute-element-center flex-column'><MdSignalWifiOff style={{ fontSize: '12rem' }} /><h1 className='container text-center' style={{ fontSize: '1.5rem' }}><span>There are no internet access.</span><br /> After checking the internet access. <br/> <button style={{ marginTop: '2rem' }} className='btn btn-default' onClick={() => {location.reload()}}>refresh this page !</button></h1><CounterReload counter={counter} /></div> :
                                <div className='absolute-element-center flex-column'><h1>None product to display now !</h1></div>
                }
            </section>

        </article>
    )
}

export default Product