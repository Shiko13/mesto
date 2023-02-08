const showInputError = (formElement, input, errorMessage, classType) => {
    const formError = formElement.querySelector(`#${input.id}-error`);
    input.classList.add(classType.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(classType.errorClass);
}

const hideInputError = (formElement, input, classType) => {
    const formError = formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(classType.inputErrorClass);
    formError.classList.remove(classType.errorClass);
    formError.textContent = '';
};

const checkInputValidity = (formElement, input, classType) => {
    if (!input.validity.valid) {
        showInputError(formElement, input, input.validationMessage, classType);
    }
    else {
        hideInputError(formElement, input, classType);
    }
};

const isInputValid = (inputList) => {
    return inputList.some((input) => {
        return !input.validity.valid;
    })
};

const toggleButtonState = (inputList, button, classType) => {
    if (isInputValid(inputList)) {
        button.classList.add(classType.inactiveButtonClass);
        button.disabled = true;
    }
    else {
        button.classList.remove(classType.inactiveButtonClass);
        button.disabled = false;
    }
}

const enableValidation = (classType) => {
    const formList = Array.from(document.querySelectorAll(classType.formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, classType);
    });
}

const setEventListeners = (formElement, classType) => {
    const inputList = Array.from(formElement.querySelectorAll(classType.inputSelector));
    const button = formElement.querySelector(classType.submitButtonSelector);

    toggleButtonState(inputList, button, classType);
    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(formElement, input, classType);
            toggleButtonState(inputList, button, classType);
        });
    });

    formElement.addEventListener('reset', () => {
        setTimeout(() => {
            resetValidation(formElement, classType);
            toggleButtonState(inputList, button, classType);
        }, 0);
    });
}

const resetValidation = (formElement, classType) => {
    const inputList = [...formElement.querySelectorAll(classType.inputSelector)];

    inputList.forEach((input) => {
        hideInputError(formElement, input, classType);
    });
}

enableValidation ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
});