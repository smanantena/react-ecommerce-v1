class ProductFunctions {

    static thisProductIsInTheCart(productToCheck, productsInCartList) {
        let arrayTransformed = productsInCartList.map((p) => (JSON.stringify(p)));
        let arrayJoined = arrayTransformed.join(',')
        return (
            arrayJoined.includes(JSON.stringify(productToCheck)))
    }

    static thisProductIsInTheCartForJSX(product, productsInCart, setIsInCart) {
        let arrayTransformed = productsInCart.map((p) => (JSON.stringify(p)));
        let arrayJoined = arrayTransformed.join(',')
        if (arrayJoined.indexOf(JSON.stringify(product)) >= 0) {
            setIsInCart(true)
            return true;
        }
        return null;
    }
}
export default ProductFunctions