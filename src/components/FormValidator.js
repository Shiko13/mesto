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
    
    _isInputValid = () => {
        return this._inputList.some((input) => {
            return !input.validity.valid;
        })
    };
    
    _toggleButtonState = () => {
        if (this._isInputValid(this._inputList)) {
            this.disableSubmitButton();
        }
        else {
            this._enableSubmitButton();
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
            this._inputList.forEach((input) => {
                this._hideInputError(input);
              });
            this.disableSubmitButton();
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

    _enableSubmitButton() {
        this._button.classList.remove(this._inactiveButtonClass);
        this._button.disabled = false;
    }

    disableSubmitButton() {
        this._button.classList.add(this._inactiveButtonClass);
        this._button.disabled = true;
    }
}