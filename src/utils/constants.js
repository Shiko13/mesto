export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const configuration = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  zoomSelector: ".popup_zoom-card",
  profileTitleSelector: ".profile__title",
  profileSubtitleSelector: ".profile__subtitle",
  profileAvatarSelector: ".profile__avatar",
  cardsSelector: ".cards",
};

export const popupEditProfile = document.querySelector(".popup_edit-profile");
export const popupEditForm = document.forms["edit-form"];
export const popupAddCard = document.querySelector(".popup_add-card");
export const popupChangeAvatar = document.querySelector(".popup_edit-avatar");
export const buttonEditProfile = document.querySelector(".profile__edit-button");
export const buttonEditAvatar = document.querySelector(".profile__avatar-edit-button");
export const buttonAddProfile = document.querySelector(".profile__add-button");