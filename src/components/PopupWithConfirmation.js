import Popup from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);

    this._buttonConfirmationSubmit = this._popup.querySelector(
      ".popup__save-button"
    );
  }

  callbackDeleteCard(removeCard) {
    this._removeCard = removeCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirmationSubmit.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._removeCard();
    });
  }
}