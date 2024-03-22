import { MdDangerous } from "react-icons/md";
import './confirmCancelPurchase.css'
import React, { useEffect, useRef, useState } from 'react'
import ButtonPrimary from '../buttons/ButtonPrimary'
import ButtonMuted from '../buttons/ButtonMuted'
import CartFunctions from '../../functions/CartFunctions';


function ConfirmCancelPurchase({textContent, setWantConfirmPurchase, setProductsInCart, setItemsNum, setItemsCountList, itemsCountList }) {
    const elementRef = useRef(null);
    const [mouseInSectionContent, setMouseInSectionContent] = useState(false);

    useEffect(
        () => {
            elementRef.current.focus()
        }
    );

    const keyDownFunc = (event) => {
        if (event.key.toLocaleLowerCase() == 'escape') {
            setWantConfirmPurchase(false)
        }
    }

    return (
        <div onClick={() => { if (!mouseInSectionContent) { setWantConfirmPurchase(false) } }} ref={elementRef} className='confirmCancelPurchaseContainer' tabIndex={-1} onKeyDown={keyDownFunc} >
            <section onMouseEnter={() => setMouseInSectionContent(true)} onMouseLeave={() => setMouseInSectionContent(false)} className="confirmCancelPurchaseContent">
                <div><MdDangerous  style={{ fontSize: '4rem', color: 'red' }} /></div>
                <p>{textContent}</p>
                <div className='confirmCancelPurchaseButtonContainer'>
                    <ButtonMuted style={{ backgroundColor: 'black', color: 'white' }} onClickEvent={() => { setWantConfirmPurchase(false); }} contentText={'No'} />
                    <ButtonMuted onClickEvent={() => { CartFunctions.cancelPurchase(setProductsInCart, setItemsNum, setItemsCountList, itemsCountList); setWantConfirmPurchase(false) }} contentText={'Yes'} />
                </div>

            </section>
        </div>
    )
}

export default ConfirmCancelPurchase