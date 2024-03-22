import React from 'react'
import { Navigate } from 'react-router-dom'


function ProtectedCommande( { totalPriceCalculator, productsInCart, itemsCountList, children} ) {
  
if (totalPriceCalculator(productsInCart, itemsCountList) > 0) {
    return children;
  } else {
    return <Navigate to={'/cart'}/>;
  }
}

export default ProtectedCommande