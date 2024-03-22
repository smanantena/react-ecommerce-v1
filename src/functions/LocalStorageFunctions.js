class LocalStorageFunctions {
    static setItemsCountListLocalStorage (itemsCountList) {
        localStorage.setItem('itemsCountList', JSON.stringify(itemsCountList))
    }

    static getItemsCountListLocalStorage () {
        return localStorage.getItem('itemsCountList')
    }

    static removeItemsCountListLocalStorage () {
        localStorage.removeItem('itemsCountList')
    }
}

export default LocalStorageFunctions