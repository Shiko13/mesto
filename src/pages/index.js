import '../pages/index.css';
import { initialCards } from '../utils/constants.js'
import { Card } from '../../src/components/Card.js';
import { FormValidator } from '../../src/components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

const configuration = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  zoomSelector: '.popup_zoom-card',
  profileTitleSelector: '.profile__title',
  profileSubtitleSelector: '.profile__subtitle'
}

const popupEditProfile = document.querySelector(".popup_edit-profile");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditForm = document.forms["edit-form"];
const popupEditFormInputTitle = popupEditForm.querySelector(".popup__input_type_title");
const popupEditFormInputSubtitle = popupEditForm.querySelector(
  ".popup__input_type_subtitle"
);
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const cards = document.querySelector(".cards");
const popupAddCard = document.querySelector(".popup_add-card");
const profileAddButton = document.querySelector(".profile__add-button");
const popupAddForm = document.forms["add-form"];

const submitAddCardForm = (evt, inputData) => {
  evt.preventDefault();
  const data = {};
  data.name = inputData.title;
  data.link = inputData.subtitle;
  const card = createCard(data);
  section.addItem(card);
  popupWithForm.close();
}

const handleProfileFormSubmit = (evt, inputData) => {
  evt.preventDefault();
  userInfo.setUserInfo(inputData);
  popupProfile.close();
}

const section = new Section( {items: initialCards, renderer: createCard}, cards);
const popupWithImage = new PopupWithImage(configuration.zoomSelector);
const popupWithForm = new PopupWithForm(".popup_add-card", submitAddCardForm);
const popupProfile = new PopupWithForm('.popup_edit-profile', handleProfileFormSubmit);
const userInfo = new UserInfo({ 
  titleSelector: configuration.profileTitleSelector, 
  subtitleSelector: configuration.profileSubtitleSelector
});
const editFormValidation = new FormValidator(configuration, popupEditProfile);
const addCardValidation = new FormValidator(configuration, popupAddCard);

function createCard(item) {
  const cardElement = new Card(item, "#element-template", {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    }
  }).addCard();
  return cardElement;
}

function openPopupEditProfile() {
  popupEditFormInputTitle.value = profileTitle.textContent;
  popupEditFormInputSubtitle.value = profileSubtitle.textContent;
  popupProfile.open();
}

section.renderItems();

editFormValidation.enableValidation();
addCardValidation.enableValidation();

popupWithForm.setEventListeners();
popupWithImage.setEventListeners();
popupProfile.setEventListeners();
buttonEditProfile.addEventListener("click", openPopupEditProfile);
profileAddButton.addEventListener("click", () => {
  popupAddForm.reset();
  popupWithForm.open();
});