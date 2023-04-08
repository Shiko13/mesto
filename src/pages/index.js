import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

const configuration = {
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

const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupEditForm = document.forms["edit-form"];
const popupEditFormInputTitle = popupEditForm.querySelector(
  ".popup__input_type_title"
);
const popupEditFormInputSubtitle = popupEditForm.querySelector(
  ".popup__input_type_subtitle"
);
const popupAddCard = document.querySelector(".popup_add-card");
const popupChangeAvatar = document.querySelector(".popup_edit-avatar");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonEditAvatar = document.querySelector(".profile__avatar-edit-button");
const buttonAddProfile = document.querySelector(".profile__add-button");
const buttonSaveCard = document.querySelector(".popup_add-card").querySelector(".popup__save-button");
const buttonSaveAvatar = document.querySelector(".popup_edit-avatar").querySelector(".popup__save-button");
const buttonSaveProfile = document.querySelector(".popup_edit-profile").querySelector(".popup__save-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const handleAddCardFormSubmit = (inputData) => {
  buttonSaveCard.textContent = "Создание...";
  api
    .addCard({ name: inputData.title, link: inputData.subtitle })
    .then((res) => {
      const card = createCard(res);
      section.addItem(card);
    })
    .then(() => popupWithForm.close())
    .catch((err) => console.log(err))
    .finally(() => {
      buttonSaveCard.textContent = "Создать";
    });
};

const handleProfileFormSubmit = (inputData) => {
  buttonSaveProfile.textContent = "Сохранение...";
  api
    .updateProfileData(inputData)
    .then((res) => userInfo.setUserInfo(res))
    .then(() => popupProfile.close())
    .catch((err) => console.log(err))
    .finally(() => {
      buttonSaveProfile.textContent = "Сохранить";
    })
};

const handleAvatarChanging = (inputData) => {
  buttonSaveAvatar.textContent = "Сохранение...";
  api
    .updateProfileAvatar(inputData.link)
    .then((res) => userInfo.setUserAvatar(res))
    .then(() => popupEditAvatar.close())
    .catch((err) => console.log(err))
    .finally(() => {
      buttonSaveAvatar.textContent = "Сохранить";
    });
};

const addLike = (card) => {
  api
    .updateLike(card.id)
    .then((res) => {
      card.addLike(res.likes);
    })
    .catch((err) => console.log(err));
};

const deleteLike = (card) => {
  api
    .deleteLike(card.id)
    .then((res) => {
      card.removeLike(res.likes);
    })
    .catch((err) => console.log(err));
};

const openPopupConfirmation = (element, cardId) => {
  popupConfirm.open();
  popupConfirm.handleDeleteCard(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        element.remove();
        element = null;
      })
      .then(() => popupConfirm.close())
      .catch((err) => console.log(err));
  });
};

let userId;
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "6ba21725-bb0e-45c3-a215-1395f01b7fb9",
    "Content-Type": "application/json",
  },
});
const section = new Section({ renderer: createCard }, configuration.cardsSelector);
const popupWithImage = new PopupWithImage(configuration.zoomSelector);
const popupWithForm = new PopupWithForm(".popup_add-card", handleAddCardFormSubmit);
const popupProfile = new PopupWithForm(".popup_edit-profile", handleProfileFormSubmit);
const popupEditAvatar = new PopupWithForm(".popup_edit-avatar", handleAvatarChanging);
const popupConfirm = new PopupWithConfirmation(".popup_delete-confirmation");
const userInfo = new UserInfo({
  titleSelector: configuration.profileTitleSelector,
  subtitleSelector: configuration.profileSubtitleSelector,
  avatarSelector: configuration.profileAvatarSelector,
});
const formValidation = new FormValidator(configuration, popupEditProfile);
const cardValidation = new FormValidator(configuration, popupAddCard);
const avatarValidation = new FormValidator(configuration, popupChangeAvatar);

function createCard(item) {
  const cardElement = new Card(
    item,
    "#element-template",
    userId,
    addLike,
    deleteLike,
    openPopupConfirmation,
    {
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      },
    }
  ).addCard();
  return cardElement;
}

function openPopupEditProfile() {
  popupEditFormInputTitle.value = profileTitle.textContent;
  popupEditFormInputSubtitle.value = profileSubtitle.textContent;
  popupProfile.open();
}

formValidation.enableValidation();
cardValidation.enableValidation();
avatarValidation.enableValidation();

popupWithForm.setEventListeners();
popupEditAvatar.setEventListeners();
popupWithImage.setEventListeners();
popupProfile.setEventListeners();
popupConfirm.setEventListeners();

buttonEditProfile.addEventListener("click", openPopupEditProfile);
buttonAddProfile.addEventListener("click", () => {
  popupWithForm.open();
});
buttonEditAvatar.addEventListener("click", () => {
  popupEditAvatar.open();
});

Promise.all([api.getInfoAboutMe(), api.getCards()])
  .then(([data, initialCards]) => {
    userInfo.setUserInfo(data);
    userInfo.setUserAvatar(data);
    userId = data._id;
    section.renderItems(initialCards);
  })
  .catch((err) => console.log(err));