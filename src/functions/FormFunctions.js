class FormFunctions {

    static checkTextInput (inputValue, inputLength) {
        return (inputValue.trim() && inputValue.length >= inputLength) ? inputValue.trim() : '';
    }

    static checkEmailInput (inputValue) {
        return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z]{2,4}$/.test(inputValue)
    }
}

export default FormFunctions