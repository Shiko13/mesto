export class Card {
  constructor(data, templateSelector, { handleCardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._selector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  addCard() {
    this._cloneCard = this._getTemplate();
    this._cloneCardTitle = this._cloneCard.querySelector(".element__title");
    this._cloneCardImage = this._cloneCard.querySelector(".element__image");

    this._cloneCardImage.src = this._link;
    this._cloneCardImage.alt = `"${this._name}"`;
    this._cloneCardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cloneCard;
  }

  _removeCard(evt) {
    evt.target.parentElement.remove();
  }

  _toggleLikeButton(evt) {
    evt.target.classList.toggle("element__like-button_active");
  }

  _setEventListeners() {
    this._cloneCard
      .querySelector(".element__delete-button")
      .addEventListener("click", this._removeCard);
    this._cloneCard
      .querySelector(".element__like-button")
      .addEventListener("click", this._toggleLikeButton);
    this._cloneCardImage
      .addEventListener("click", () => this._handleCardClick(this._name, this._link));
  }
}
