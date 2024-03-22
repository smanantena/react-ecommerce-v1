import React from 'react'
import Product from '../products/Product'

function Home ( { products, isLoading, addProductToCart, productsInCart, itemsNum, isFilter, keywords, networkErrorOccured, counter, isFilterEmpty } ) {
    return (
        <>
            <main>
                <div className='container'>
                    <Product products = { products } isLoading={ isLoading } addProductToCart={ addProductToCart }  productsInCart={ productsInCart } itemsNum={ itemsNum } isFilter={isFilter} keywords={keywords} networkErrorOccured={networkErrorOccured} counter={counter} isFilterEmpty={isFilterEmpty}/>
                </div>
            </main>
        </>
    )
}

export default Home