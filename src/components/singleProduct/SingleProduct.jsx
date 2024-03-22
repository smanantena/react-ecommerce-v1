import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";
import React, { useEffect, useState } from 'react'
import Loader from '../loader/Loader'
import { useParams, NavLink } from "react-router-dom"
import './SingleProduct.css'
import Stars from '../Stars/Stars'
import ButtonAddToCard from '../buttons/ButtonAddToCard'
import ProductFunctions from '../../functions/ProductFunctions'
import TimerCounter from '../../functions/TimerCounter'
import { MdSignalWifiOff } from "react-icons/md";
import CounterReload from '../counters/CounterReload'
import OffLineFunctions from '../../functions/OffLineFunctions'
import NotFound from '../../pages/notFound/NotFound'

function SingleProduct({ addProductToCart, productsInCart, products }) {
    const [single, setSingle] = useState({})
    const [isInCart, setIsInCart] = useState(false);
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(false);
    const [counter, setCounter] = useState(0);
    const [networkErrorOccured, setNetworkErrorOccured] = useState(false);

    let rating = null
    // console.info("Product in the cart : ")
    // console.info(productsInCart)

    const getSingleProductOnline = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await res.json()
            setSingle(data)
            rating = data.rating
            setIsLoading(false)
        } catch (error) {
            if (error.name == 'TypeError' && error.message.includes('NetworkError')) {
                setNetworkErrorOccured(true);
                setIsLoading(false)
                TimerCounter.timesCountesReload(180, setCounter)
            }
        } finally {

        }
    }

    // on line data
    // useEffect(() => {
    //     getSingleProductOnline()
    // }, [])

    const getSingleProductOffline = () => {
        setIsLoading(true)

        const data = OffLineFunctions.dataOffline()
        for (let productItem of data) {
            if (productItem.id == id) {
                setSingle(productItem)
                setIsInCart(ProductFunctions.thisProductIsInTheCart(productItem, productsInCart))
                // console.log(single.image)
                break;
            }
        }

        // rating = data.rating
        setIsLoading(false)
        return single.id;
    }

    //offline data
    useEffect(
        () => {
            getSingleProductOffline()
        }, []
    )

    if (networkErrorOccured) {
        return (
            <div className='absolute-element-center flex-column'><MdSignalWifiOff style={{ fontSize: '12rem' }} /><h1 className='container text-center' style={{ fontSize: '1.5rem' }}><span>There are no internet access.</span><br /> After checking the internet access. <br /> <button style={{ marginTop: '2rem' }} className='btn btn-default' onClick={() => { location.reload() }}>refresh this page !</button></h1><CounterReload counter={counter} /></div>
        )
    }

    if (!OffLineFunctions.dataOffline().map((p) => (JSON.stringify(p))).join(',').includes(`"id":${id}`)) {
        return (
            <NotFound />
        )
    }

    if (single.id != id) {
        getSingleProductOffline()
    }
    const addToCart = () => {
        setIsInCart(true)
        addProductToCart(single);
    };

    return (
        <>
            {isLoading && <Loader />}

            {!isLoading &&
                <div className='container'>
                    <div className='product-view-content'>
                        <img className='product-view-image' src={new URL(single['image'], import.meta.url).href} alt="" />
                        <div className='product-view-text'>
                            <h2>{single.title}</h2>
                            <h3 className='product-view-content-price'>{single.price}</h3>
                            <p className='product-view-content-description'>{single.description}</p>
                            {
                                (rating != null) ?
                                    <p>{<Stars />}{<Stars />}{<Stars />}{<Stars />}{<Stars />}{rating.rate}</p>
                                    :
                                    ''
                            }
                            {
                                (rating != null) ?
                                    <p>{rating.count}</p>
                                    :
                                    ''
                            }
                            <ButtonAddToCard productID={single.id} product={single} addToCart={addToCart} isInCart={isInCart} setIsInCart={setIsInCart} />
                        </div>

                        <NavLink style={(parseInt(single.id) - 1) < OffLineFunctions.firstItemId() ? { display: 'none' } : {}} className={'single-product-previous'} to={`/product/${parseInt(single.id) - 1}`}><FaCircleArrowLeft className="product-navigation" /></NavLink>

                        <NavLink style={(parseInt(single.id) + 1) > OffLineFunctions.lastItemId() ? { display: 'none' } : {}} className={'single-product-next'} to={`/product/${parseInt(single.id) + 1}`}><FaCircleArrowRight className="product-navigation" /></NavLink>
                    </div>
                </div >
            }
        </>
    )
}

export default SingleProduct