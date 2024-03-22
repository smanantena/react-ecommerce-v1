import React, { useState } from 'react'
import './css/FormForValidationCart.css'
import SubmitButton from '../../components/buttons/SubmitButton'
import { IoMdCloseCircle } from "react-icons/io";
import FormFunctions from '../../functions/FormFunctions';
import FileBufferFunctions from '../../functions/FileBufferFunctions';
import FacturesFunctions from '../../functions/FacturesFunctions';
import CartFunctions from '../../functions/CartFunctions';

function FormForValidationCart({ setValideCart, cartInfo, setProductsInCart, setItemsNum, setItemsCountList, itemsCountList }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mouseInDivContent, setMouseInDivContent] = useState(false);

    const confirmPurshace = (e) => {
        e.preventDefault();
        // if(!name) {
        //     alert
        //     return;
        // }
        let nameForManipulation = '';
        let emailForManipulation = '';

        if (FormFunctions.checkTextInput(name, 2)) {
            nameForManipulation = name;
        }
        if (FormFunctions.checkEmailInput(email)) {
            // console.log(`Email ${email}`);
            emailForManipulation = email;
        }

        if (nameForManipulation && emailForManipulation) {
            
            const funcArg = {
                data: 'Thanks !',
                fileName: 'facture'
            }

            cartInfo['clientName'] = nameForManipulation;
            cartInfo['clientEmail'] = emailForManipulation

            FileBufferFunctions.generateAndAutomaticDownloadFileText({data: FacturesFunctions.generateFactureContentString(cartInfo), fileName: 'ecommerce-by-manantena-invoice'});
            // FacturesFunctions.generateFactureContentPDF();
            setName('');
            setEmail('');
            CartFunctions.cancelPurchase(setProductsInCart, setItemsNum, setItemsCountList, itemsCountList);
            setValideCart(false);

        }
    }
    return (
        <div className='form-for-validation-cart-container' onClick={ () => { if (!mouseInDivContent) { setValideCart(false) } } }>
            <div className="form-for-validation-cart-content" onMouseEnter={ () => { setMouseInDivContent(true) } } onMouseLeave={ () => { setMouseInDivContent(false) } }>
                <IoMdCloseCircle onClick={() => { setValideCart(false) }} id="close-btn" />
                <h1>Complete this form</h1>
                <form onSubmit={confirmPurshace}  onKeyDown={(e) => { if (e.key.toLocaleLowerCase() == 'escape' ) { setValideCart(false) }}}>
                    <div>
                        <label htmlFor='email'>Your email address</label>
                        <input id='email' typeof='email' onChange={ (e) => { setEmail(e.target.value) }} autoFocus />
                    </div>
                    <div>
                        <label htmlFor='name'>Your name</label>
                        <input id='name' typeof='text' onChange={ (e) => { setName(e.target.value) } } />
                    </div>
                    <SubmitButton contentText={'purchase'} />
                </form>
            </div>
        </div>
    )
}

export default FormForValidationCart