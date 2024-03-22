import React from 'react'
import "./css/Search.css"
import { IoSearchCircleSharp } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";

function Search({ filterProducts, isFilterEmpty, clearSearchInput, globalKeywords }) {
  return (
    <span className='search-container'>
      { (isFilterEmpty) ? 
        <IoSearchCircleSharp className='search-icon'/>
        :
        <IoMdCloseCircle onClick={() => {clearSearchInput(document.getElementById('searchInput')) }} className='search-icon'/>
      }
      <input id="searchInput" value={globalKeywords} onChange={(e) => { filterProducts(e.target.value.trim()) }} type='text' className='search-input' />
    </span>
  )
}

export default Search