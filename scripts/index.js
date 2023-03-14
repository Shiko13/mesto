import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popupElements = document.querySelectorAll('.popup')
const popupEditProfile = document.querySelector(".popup_edit-profile");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditForm = popupEditProfile.querySelector(".popup__edit-form");
const popupEditFormInputTitle = popupEditForm.querySelector(".popup__input_type_title");
const popupEditFormInputSubtitle = popupEditForm.querySelector(
  ".popup__input_type_subtitle"
);
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const cards = document.querySelector(".cards");
const popupAddCard = document.querySelector(".popup_add-card");
const profileAddButton = document.querySelector(".profile__add-button");
const popupAddCardInputTitle = popupAddCard.querySelector('.popup__input_type_title');
const popupAddCardInputSubtitle = popupAddCard.querySelector('.popup__input_type_subtitle');
const popupAddForm = popupAddCard.querySelector('.popup__add-form');

const popupZoomCard = document.querySelector('.popup_zoom-card');
const zoomImage = document.querySelector('.zoom__image');
const zoomTitle = document.querySelector('.zoom__title');

const configuration = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByPressEscape);
}

function openPopupEditProfile() {
  popupEditFormInputTitle.value = profileTitle.textContent;
  popupEditFormInputSubtitle.value = profileSubtitle.textContent;
  resetProfileValidation(popupEditForm);
  openPopup(popupEditProfile);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupByPressEscape);
}

function closePopupByPressEscape(evt) {
  if (evt.key === 'Escape') {
      const popup = document.querySelector('.popup_opened');
      closePopup(popup);
  }
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupEditFormInputTitle.value;
  profileSubtitle.textContent = popupEditFormInputSubtitle.value;
  closePopup(popupEditProfile);
}

function submitAddCardForm(evt) {
  evt.preventDefault();
  const card = {
    name: popupAddCardInputTitle.value,
    link: popupAddCardInputSubtitle.value,
  }
  renderCard(card, cards);
  evt.target.reset();
  closePopup(popupAddCard);
}

function renderCard(cardData, container) {
  const card = new Card(cardData, "#element-template", openPopup, popupZoomCard, zoomImage, zoomTitle);
  const newCard = card.addCard();
  container.prepend(newCard);
}

function fillByInitialCards(initCards) {
  initCards.forEach((elem) => {
    renderCard(elem, cards);
  });
}

popupElements.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
    }
  })
})

function resetProfileValidation(form) {
  const inputList = [...form.querySelectorAll('.popup__input')];
  inputList.forEach((input) => {
    const formError = form.querySelector(`#${input.id}-error`);
    input.classList.remove('popup__input_type_error');
    formError.classList.remove('popup__input_type_error');
    formError.textContent = '';
  });
}

fillByInitialCards(initialCards);

buttonEditProfile.addEventListener("click", function () {openPopupEditProfile()});
profileAddButton.addEventListener("click", () => {
  popupAddForm.reset();
  openPopup(popupAddCard)
});
popupEditForm.addEventListener("submit", submitEditProfileForm);
popupAddCard.addEventListener("submit", submitAddCardForm);

const editFormValidation = new FormValidator(configuration, popupEditProfile);
editFormValidation.enableValidation();

const addCardValidation = new FormValidator(configuration, popupAddCard);
addCardValidation.enableValidation();

