import React from 'react'
import { BsCashCoin } from "react-icons/bs"
import { FaShoppingCart } from "react-icons/fa"
import DefaultButton from '../../components/buttons/DefaultButton';
import ButtonMuted from '../../components/buttons/ButtonMuted';
import { NavLink } from 'react-router-dom';

function TotalPrice({ productsInCart, itemsCountList, itemsNum, setValideCart, setWantConfirmPurchase }) {
    let priceArray = productsInCart.map((product) => (
        ((product.price) * itemsCountList[product.id]))
        );
    let totalPrice = (priceArray).reduce((accumulator, price) => ((accumulator + price)));
    

    return (
        <>

            <div className='total-price-container'>
                <div className='total-price-section'>
                    <BsCashCoin className='total-price-icon' />
                    <div>
                        <h1 className='total-price-title'>Total price</h1>
                        <p className='total-price-paragraph'>
                            ${totalPrice.toFixed(2)}
                        </p>
                    </div>
                </div>

                <div className='total-price-section'>
                    <FaShoppingCart className='total-price-icon' />
                    <div>
                        <h2 className='total-price-items-number-title'>Items number</h2>
                        <p className='total-price-items-number-number'>{itemsNum}</p>
                    </div>
                </div>

                <div className='total-price-section-v'>
                    <DefaultButton contentText={'confirm purchase'} setValideCart={setValideCart}/>
                    <ButtonMuted contentText={ 'clear cart' } onClickEvent={() => {setWantConfirmPurchase(true)}} />
                </div>
                <div className='total-price-section'>
                    <NavLink to={'/'}><ButtonMuted contentText={'add another'} /></NavLink>
                </div>
            </div>

        </>
    )
}

export default TotalPrice