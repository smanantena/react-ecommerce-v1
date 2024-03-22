import React from 'react'
import './css/ItemsNum.css'

function ItemNum({ itemsNum }) {
    
    return (
        <div className='items-num-container'>
            <p className='items-num-text' style={ (itemsNum > 999) ? {fontSize : '.5rem'} : {} }>{ (itemsNum <= 999) ? itemsNum : '999+' }</p>
        </div>
    )
}

export default ItemNum