import CookiesFunctions from "./CookiesFunctions";
import LocalStorageFunctions from "./LocalStorageFunctions";

class CartFunctions {

    static cancelPurchase(setProductsInCart, setItemsNum, setItemsCountList, itemsCountList) {
        setProductsInCart([]);
        setItemsNum(0);
        setItemsCountList({});
        // setCookieData('itemsCountList', '{}', 0)
        LocalStorageFunctions.removeItemsCountListLocalStorage()
        // console.log('Cancel purchase');
    }

    static deleteProductItem(product, setProductsInCart, setItemsNum, productsInCart, itemsCountList) {
        delete itemsCountList[product.id]
        delete productsInCart[productsInCart.indexOf(product)]
        setProductsInCart([...productsInCart])
        let temp = productsInCart.filter((value) => (value != null || value != undefined))
        setProductsInCart([...temp])
        // setCookieData('itemsCountList', JSON.stringify(itemsCountList), 5)
        LocalStorageFunctions.setItemsCountListLocalStorage(itemsCountList)
        let tempItemsNumber = 0;
        for (let numberItem in itemsCountList) {
            tempItemsNumber += parseInt(itemsCountList[numberItem]);
        }
        setItemsNum(tempItemsNumber)
    }

    static handelNumberItemValue (number, setShowBool, itemsCountList, setItemsCountList, itemID, productsInCart, productItem, setProductsInCart, setItemsNum, valueWanted) {
        if (valueWanted == number) {

        } else if (valueWanted > 0) {
          itemsCountList[itemID] = valueWanted;
          setItemsCountList({ ...itemsCountList })
          let tempAgregation = 0;
          for (let numberItem in itemsCountList) {
            tempAgregation += itemsCountList[numberItem];
          }
          setItemsNum(tempAgregation)

        } else {
          let arrayOfStringify = productsInCart.map((p) => (JSON.stringify(p)));
          let indexInCartList = arrayOfStringify.indexOf(JSON.stringify(productItem));
          delete productsInCart[indexInCartList]
          delete itemsCountList[itemID]
          setProductsInCart([...productsInCart])
          let temp = productsInCart.filter((value) => (value != null || value != undefined))
          setProductsInCart([...temp])
          let tempAgregation = 0;
          for (let numberItem in itemsCountList) {
            tempAgregation += itemsCountList[numberItem];
          }
          setItemsNum(tempAgregation)
        }
        if (Object.keys(itemsCountList).length) {
          LocalStorageFunctions.setItemsCountListLocalStorage(itemsCountList)
          // CookiesFunctions.setCookieData('itemsCountList', JSON.stringify(itemsCountList), 5)
        } else {
          // CookiesFunctions.setCookieData('itemsCountList', JSON.stringify(itemsCountList), 0)
          LocalStorageFunctions.removeItemsCountListLocalStorage()
        }
        setShowBool(false)
    }

}

export default CartFunctions;