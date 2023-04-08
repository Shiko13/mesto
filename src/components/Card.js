export class Card {
  constructor(data, templateSelector, userId, addLike, removeLike, openPopupConfirmation, { handleCardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._selector = templateSelector;
    this._handleCardClick = handleCardClick;
    
    this._likes = data.likes;
    this._userId = userId;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this.id = data._id;
    this._ownerId = data.owner._id;
    this._openPopupConfirmation = openPopupConfirmation;
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
    this._buttonLike = this._cloneCard.querySelector(".element__like-button");
    this._cloneCardImage.src = this._link;
    this._cloneCardImage.alt = `"${this._name}"`;
    this._cloneCardTitle.textContent = this._name;

    if (this._ownerId === this._userId) {
      this._showDeleteButton();
    }
    
    this._elementLikeCount = this._cloneCard.querySelector('.element__like-counter');
    this._toggleLikeCounter(this._likes);
    this._likes.map(a => a._id).includes(this._userId) && this._showLike();
    this._setEventListeners();

    return this._cloneCard;
  }

  _removeCard(evt) {
    evt.target.parentElement.remove();
  }

  _showLike(){
    this._buttonLike.classList.add("element__like-button_active");
  }

  _hideLike(){
    this._buttonLike.classList.remove("element__like-button_active");
  }

  _showDeleteButton() {
    this._cloneCard.querySelector(".element__delete-button")
    .classList.add("element__delete-button_show");
  }

  _toggleLikeCounter(whoLikedIt){
    const countLike = whoLikedIt.length;
    if (countLike > 0){
      this._elementLikeCount.textContent = countLike;
      this._elementLikeCount.classList.add('element__like-counter_active');
    } else {
      this._elementLikeCount.classList.remove('element__like-counter_active');
    }
  }

  _handleLikeButton() {
    if (this._buttonLike.classList.contains("element__like-button_active")) {
      this._removeLike(this);
    }
    else {
      this._addLike(this);
    }
  }

  addLike(whoLikedIt) {
    this._toggleLikeCounter(whoLikedIt);
    this._showLike();
  }

  removeLike(whoLikedIt) {
    this._toggleLikeCounter(whoLikedIt);
    this._hideLike();
  }

  _setEventListeners() {
    this._cloneCard
      .querySelector(".element__delete-button")
      .addEventListener("click", () => {
        this._openPopupConfirmation(this._cloneCard, this.id);
      });
      this._buttonLike
      .addEventListener("click", () => {
        this._handleLikeButton()}
      );
    this._cloneCardImage
      .addEventListener("click", () => this._handleCardClick(this._name, this._link));
  }
}