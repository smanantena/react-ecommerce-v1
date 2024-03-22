import React from 'react'
import './Emphase.css'
import parse from 'html-react-parser';

function Emphase({ content, isFilter, keywords }) {
    if (isFilter) {
        return (
            <>{parse(content.replaceAll(new RegExp(keywords, 'ig'), "<em className='emphase-text'>"+keywords+"</em>"))}</>
        )
    } else {
        return (
            <>
            {content}
            </>
        )
    }
}

export default Emphase