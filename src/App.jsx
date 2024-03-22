import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import NotFound from './pages/notFound/NotFound'
import Nav from './pages/nav/Nav'
import { useState } from 'react'
import SingleProduct from './components/singleProduct/SingleProduct'
import CartFunctions from './functions/CartFunctions'
import CookiesFunctions from './functions/CookiesFunctions'
import TimerCounter from './functions/TimerCounter'
import OffLineFunctions from './functions/OffLineFunctions'
import LocalStorageFunctions from './functions/LocalStorageFunctions'
import JSONFunctions from './functions/JSONFunctions'
import ProtectedCommande from './components/protectedCommandes/ProtectedCommande'
import FormForValidationCart from './pages/products/FormForValidationCart'


function App() {

  const [products, setProduct] = useState([]); //destruct
  const [productsToPrint, setProductsToPrint] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [productsInCart, setProductsInCart] = useState([]); //product in cart
  const [itemsNum, setItemsNum] = useState(0);
  const [itemsCountList, setItemsCountList] = useState({});
  const [isFilter, setIsFilter] = useState(false);
  const [isFilterEmpty, setIsFilterEmpty] = useState(true);
  const [globalKeywords, setGlobalKeywords] = useState('');
  const [valideCart, setValideCart] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [networkErrorOccured, setNetworkErrorOccured] = useState(false);
  const [countActived, setCountActived] = useState(false);
  const [counter, setCounter] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const totalPriceCalculator = (productsInCart, itemsCountList) => {
    let totalTemp = 0;
    console.log(`List of products in cart : ${productsInCart}`)
    console.log(`Items count list : ${JSON.stringify(itemsCountList)}`)
    totalTemp = productsInCart.reduce(
      (accumulator, product) => {
        console.log(`The current product ${product}`);
        return accumulator += product.price * parseInt(itemsCountList[product.id])
      }, 0
    )
    console.log(`Total temp value : ${totalTemp}`);

    return totalTemp;
  }

  const addProductToCart = (newProduct) => {
    productsInCart.push(newProduct)
    setProductsInCart([...productsInCart])
    let tempList = {}
    tempList[newProduct.id] = 1
    Object.assign(itemsCountList, tempList)
    // console.info("tempList")
    // console.log(tempList)
    setItemsCountList({ ...itemsCountList })
    // CookiesFunctions.setCookieData('itemsCountList', JSON.stringify(itemsCountList), 5)
    LocalStorageFunctions.setItemsCountListLocalStorage(itemsCountList)
    // console.info("items count list")
    // console.log(itemsCountList)
    setItemsNum(itemsNum + 1)
  };

  const addItemsCountList = (productItemId) => {
    // console.log("Products in cart")
    // console.log(productsInCart[productItemId])
    itemsCountList[productItemId] = itemsCountList[productItemId] + 1
    setItemsNum(itemsNum + 1)
    setItemsCountList({ ...itemsCountList })
    // CookiesFunctions.setCookieData('itemsCountList', JSON.stringify(itemsCountList), 5)
    LocalStorageFunctions.setItemsCountListLocalStorage(itemsCountList)
  }

  const removeItemsCountList = (productItemId, product) => {
    setItemsNum(itemsNum - 1)
    if (itemsCountList[productItemId] > 0) {
      itemsCountList[productItemId] = itemsCountList[productItemId] - 1
      setItemsCountList({ ...itemsCountList })
    }
    if (itemsCountList[productItemId] <= 0) {
      delete itemsCountList[productItemId]
      delete productsInCart[productsInCart.indexOf(product)]
      setProductsInCart([...productsInCart])
      let temp = productsInCart.filter((value) => (value != null || value != undefined))
      setProductsInCart([...temp])
    }
    // CookiesFunctions.setCookieData('itemsCountList', JSON.stringify(itemsCountList), 5)
    LocalStorageFunctions.setItemsCountListLocalStorage(itemsCountList)
  }

  const clearSearchInput = (searchInput) => {
    searchInput.value = '';
    setGlobalKeywords('');
    setIsFilterEmpty(true);
    setIsFilter(false);
    setProductsToPrint([...products])
  }

  const filterProducts = (keywords) => {
    // console.info("Products to print")
    if (keywords == '') {
      setIsFilterEmpty(true)
    } else {
      setIsFilterEmpty(false)
      setGlobalKeywords('');
    }
    let productsTo = products.filter(
      (product) => {
        return 0 <= product.title.toUpperCase().indexOf(keywords.toUpperCase()) || 0 <= product.description.toUpperCase().indexOf(keywords.toUpperCase())
      }
    )
    setProductsToPrint([...productsTo])

    setIsFilter(true)
    setGlobalKeywords(keywords)

    // console.log(productsToPrint)

  }

  const chechItemsCountList = (itemsCountList) => {
    for (const key in itemsCountList) {
      if (Object.hasOwnProperty.call(itemsCountList, key)) {

        if (parseInt(itemsCountList[key]) < 1) {
          delete itemsCountList[key]
        }

      }
    }
    return itemsCountList
  }

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const getDataFromLocalStorage = (data) => {
    let itemsCountListFromLocalStorage = LocalStorageFunctions.getItemsCountListLocalStorage()
    // console.log(itemsCountListFromLocalStorage)

    if (itemsCountListFromLocalStorage != '') {

      if (JSONFunctions.isJsonString(itemsCountListFromLocalStorage)) {
        // 1. Get numbers to local storage
        Object.assign(itemsCountList, JSON.parse(itemsCountListFromLocalStorage))
        setItemsCountList({ ...itemsCountList })

        // 2. Set numbers items to display on nav bar
        let itemsNumTemp = 0
        for (let itemNumber in itemsCountList) {
          itemsNumTemp += parseInt(itemsCountList[itemNumber])
        }
        setItemsNum(itemsNumTemp)

        // 3. Set products in cart list
        const productsInCartTemp = []
        let productsIDsToCart = Object.keys(itemsCountList)
        productsIDsToCart = productsIDsToCart.map((p) => (parseInt(p)))
        for (let product of data) {
          if (productsIDsToCart.includes(product.id)) {
            productsInCartTemp.push(product)
          }
        }
        setProductsInCart([...productsInCartTemp])

      } else {
        LocalStorageFunctions.removeItemsCountListLocalStorage()
      }

    }
  }

  const getDataFromCookies = (data) => {
    if (CookiesFunctions.getCookie('itemsCountList') != '' && CookiesFunctions.getCookie('itemsCountList').length > 0) {
      if (!isJsonString(CookiesFunctions.getCookie('itemsCountList'))) {
        CookiesFunctions.setCookieData('itemsCountList', '{}', 0)

      } else {
        const tempCount = chechItemsCountList(JSON.parse(CookiesFunctions.getCookie('itemsCountList')))
        Object.assign(itemsCountList, tempCount)
        setItemsCountList({ ...itemsCountList })



        // console.info("From cookie")
        // console.log(itemsCountList)
        let itemsCount = 0
        for (const key in itemsCountList) {
          if (Object.hasOwnProperty.call(itemsCountList, key)) {
            itemsCount += itemsCountList[key]
          }
        }
        let ids = Object.keys(itemsCountList).map((p) => (parseInt(p)))
        const tempPro = []
        setItemsNum(itemsCount)
        data.forEach(
          (product) => {

            // console.info("Product cookie list :")
            // console.log(product)
            if (ids.indexOf(product.id) >= 0 && itemsCountList[product.id] > 0) {
              tempPro.push(product)
            }
          }
        )
        setProductsInCart(tempPro)
      }
      // console.info("From cookie list :")
      // console.log(productsInCart)
    }
  }
  // var templateParams = {
  //   to_name: 'Manantena',
  //   notes: 'Check this out!',
  //   from_name: 'manantenawithreact@gmail.com',
  //   message: 'Andrana',
  //   to_email: 'randriantsoa.manantena@gmail.com'
  // };
  // emailjs.send('GmailManantenaWithReact', 'template_hu1ymro', templateParams) //use your Service ID and Template ID
  //   .then(function (response) {
  //     console.log('SUCCESS!', response.status, response.text);
  //   }, function (error) {
  //     console.log('FAILED...', error);
  //   });

  const fetchProduct = async () => {

    setIsLoading(true);

    try {
      const res = await fetch(`https://fakestoreapi.com/products`);
      const data = await res.json();

      console.info(data);
      setProduct(data); // insert data result to products state
      setProductsToPrint(data)
      // getDataFromCookies(data)
      getDataFromLocalStorage(data)
      setIsLoading(false);

    } catch (error) {
      // console.log(error)
      // console.log(`Typeof error ${typeof(error.name)}`)
      if (error.name == 'TypeError' && error.message.includes('NetworkError')) {
        setNetworkErrorOccured(true);
        setIsLoading(false)
        TimerCounter.timesCountesReload(180, setCounter)
      }
    } finally {

      // setIsLoading(false);
    }
  };
  // onLine data
  // useEffect(() => {
  //   fetchProduct()
  // }, []
  // ) 

  const getOfflineProduct = () => {
    setIsLoading(true)
    const data = OffLineFunctions.dataOffline();
    setProduct(data); // insert data result to products state
    setProductsToPrint(data)
    // getDataFromCookies(data)
    getDataFromLocalStorage(data)
    setIsLoading(false);
  }

  // offline data
  useEffect(
    () => {
      getOfflineProduct()
    }, []
  )


  return (
    <>
      <BrowserRouter>
        <Nav filterProducts={filterProducts} itemsNum={itemsNum} isFilterEmpty={isFilterEmpty} clearSearchInput={clearSearchInput} globalKeywords={globalKeywords} networkErrorOccured={networkErrorOccured} />
        <Routes>
          <Route path="/" element={<Home products={productsToPrint} isLoading={isLoading} addProductToCart={addProductToCart} productsInCart={productsInCart} itemsNum={itemsNum} setProductsInCart={setProductsInCart} isFilterEmpty={isFilterEmpty} isFilter={isFilter} keywords={globalKeywords} networkErrorOccured={networkErrorOccured} counter={counter} />} />
          <Route path='/cart' element={<Cart productsInCart={productsInCart} isLoading={isLoading} addProductToCart={addProductToCart} itemsNum={itemsNum} itemsCountList={itemsCountList} addItemsCountList={addItemsCountList} removeItemsCountList={removeItemsCountList} setValideCart={setValideCart} valideCart={valideCart} cancelPurchase={CartFunctions.cancelPurchase} setProductsInCart={setProductsInCart} setItemsNum={setItemsNum} setItemsCountList={setItemsCountList} setCookieData={CookiesFunctions.setCookieData} />} />
          <Route path='/product/:id' element={<SingleProduct addProductToCart={addProductToCart} productsInCart={productsInCart} itemsNum={itemsNum} inCart={inCart} setInCart={setInCart} products={products} />} />
          <Route path='/command' element={
            <ProtectedCommande totalPriceCalculator={totalPriceCalculator} productsInCart={productsInCart} itemsCountList={itemsCountList}>
              <FormForValidationCart />
            </ProtectedCommande>
          } />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App