import React from 'react'
import { NavLink } from 'react-router-dom'
import Search from './Search'
import './css/Nav.css'
import { GoHomeFill } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { HiMiniShoppingBag } from "react-icons/hi2";
import ItemNum from './ItemsNum';
import { useLocation } from 'react-router-dom';

function Nav({ itemsNum, filterProducts, isFilterEmpty, clearSearchInput, globalKeywords, networkErrorOccured }) {
    // (()=>console.log(useLocation()))()
    return (
        <nav className='navbar' style={(networkErrorOccured) ? {backgroundColor: '#ccc', color: '#ddd'} : null}>
            <div className='container navbar-container'>
                <span>
                    <NavLink className='nav-link' to={"/"}><HiMiniShoppingBag className='nav-icons' />E-shop</NavLink>
                </span>

                {

                    (useLocation().pathname !== '/' || networkErrorOccured) ?
                        ''
                        :
                        < Search filterProducts={filterProducts} isFilterEmpty={isFilterEmpty} clearSearchInput={clearSearchInput} globalKeywords={globalKeywords} className='nav-link' />
                }
                <span>
                    <NavLink className='nav-link' to={"/"}><GoHomeFill className='nav-icons' />Home</NavLink>
                    {
                        !networkErrorOccured &&
                        <NavLink className={itemsNum > 0 ? 'nav-link cart-link' : 'nav-link'} to={"/cart"}>{itemsNum > 0 && <ItemNum itemsNum={itemsNum} />}<FaShoppingCart className='nav-icons' />Cart</NavLink>
                    }
                </span>
            </div>
        </nav>
    )
}

export default Nav