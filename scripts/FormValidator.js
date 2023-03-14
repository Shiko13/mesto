export class FormValidator {
    constructor(configuration, formElement) {
        this._formSelector = configuration.formSelector;
        this._inputSelector = configuration.inputSelector;
        this._submitButtonSelector = configuration.submitButtonSelector;
        this._inactiveButtonClass = configuration.inactiveButtonClass;
        this._inputErrorClass = configuration.inputErrorClass;
        this._errorClass = configuration.errorClass;
        this._formElement = formElement;
    }

    _showInputError = (input, errorMessage) => {
        const formError = this._formElement.querySelector(`#${input.id}-error`);
        input.classList.add(this._inputErrorClass);
        formError.textContent = errorMessage;
        formError.classList.add(this._errorClass);
    }
    
    _hideInputError = (input) => {
        const formError = this._formElement.querySelector(`#${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        formError.classList.remove(this._errorClass);
        formError.textContent = '';
    };
    
    _checkInputValidity = (input) => {
        if (!input.validity.valid) {
            this._showInputError(input, input.validationMessage);
        }
        else {
            this._hideInputError(input);
        }
    };
    
    _isInputValid = (inputList) => {
        return inputList.some((input) => {
            return !input.validity.valid;
        })
    };
    
    _toggleButtonState = (inputList, button) => {
        if (this._isInputValid(inputList)) {
            button.classList.add(this._inactiveButtonClass);
            button.disabled = true;
        }
        else {
            button.classList.remove(this._inactiveButtonClass);
            button.disabled = false;
        }
    }
    
    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._button = this._formElement.querySelector(this._submitButtonSelector);
    
        this._toggleButtonState(this._inputList, this._button);
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._toggleButtonState(this._inputList, this._button);
            });
        });
    
        this._formElement.addEventListener('reset', () => {
            setTimeout(() => {
                this._resetValidation();
                this._toggleButtonState(this._inputList, this._button);
            }, 0);
        });
    }
    
    _resetValidation() {
        this._inputList.forEach((input) => {
            this._hideInputError(input);
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}