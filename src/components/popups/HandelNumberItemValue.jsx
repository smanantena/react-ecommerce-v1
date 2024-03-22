import React, { useState } from 'react'
import ButtonPrimary from '../buttons/ButtonPrimary'
import ButtonMuted from '../buttons/ButtonMuted'
import './HandelNumberItemValue.css'
import CartFunctions from '../../functions/CartFunctions';

function HandelNumberItemValue({ number, setShowBool, itemsCountList, setItemsCountList, itemID, productsInCart, productItem, setProductsInCart, setItemsNum }) {
  const [valueWanted, setValueWanted] = useState(number);
  const [cursorIsInContent, setCursorIsInContent] = useState(false);

  return (
    <div className='handelNumberItemValueContainer' tabIndex={1} onClick={
      () => {
        if (!cursorIsInContent) {
          setShowBool(false)
        }
      }}

      onKeyDown={
        (event) => {
          if (event.key.toLowerCase() == 'escape') { 
            setShowBool(false)
          }

          if (event.key.toLowerCase() == 'enter') {
            CartFunctions.handelNumberItemValue(number, setShowBool, itemsCountList, setItemsCountList, itemID, productsInCart, productItem, setProductsInCart, setItemsNum, valueWanted)
          }
        }
      }
    >
      <div onMouseEnter={() => setCursorIsInContent(true)} onMouseLeave={() => setCursorIsInContent(false)} className="handelNumberItemValueContent">
        <h3>Modify</h3>
        <input autoFocus type='number' onKeyDown={
          (e) => {
            if (e.key.toLowerCase() == 'enter') {
              CartFunctions.handelNumberItemValue(number, setShowBool, itemsCountList, setItemsCountList, itemID, productsInCart, productItem, setProductsInCart, setItemsNum, valueWanted)
            }
            if (e.key.toLowerCase() == 'escape') {
              setShowBool(false)
            }
          }} minLength={0} defaultValue={number} onChange={(e) => { setValueWanted((isNaN(parseInt(e.target.value))) ? (e.target.value == '') ? 0 : number : parseInt(e.target.value)) }} />
        <div className='handelNumberItemValueButtonContainer'>
          <ButtonPrimary onClickFunc={() => {
            CartFunctions.handelNumberItemValue(number, setShowBool, itemsCountList, setItemsCountList, itemID, productsInCart, productItem, setProductsInCart, setItemsNum, valueWanted)
          }} contentText='apply' />
          <ButtonMuted onClickEvent={() => { setShowBool(false) }} contentText='cancel' />
        </div>
      </div>
    </div>
  )
}

export default HandelNumberItemValue