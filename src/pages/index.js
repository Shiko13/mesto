import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { configuration, popupEditProfile, popupAddCard, popupChangeAvatar, 
  buttonEditProfile, buttonEditAvatar, buttonAddProfile } from "../utils/constants.js";

const handleAddCardFormSubmit = (inputData) => {
  return api
    .addCard({ name: inputData.title, link: inputData.subtitle })
    .then((res) => {
      const card = createCard(res);
      section.addItem(card);
    })
    .catch((err) => console.log(err))
};

const handleProfileFormSubmit = (inputData) => {
  return api
    .updateProfileData(inputData)
    .then((res) => userInfo.setUserInfo(res))
    .catch((err) => console.log(err));
};

const handleAvatarChanging = (inputData) => {
  return api
    .updateProfileAvatar(inputData.link)
    .then((res) => userInfo.setUserAvatar(res))
    .catch((err) => console.log(err));
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
const section = new Section(
  { renderer: createCard },
  configuration.cardsSelector
);
const popupWithImage = new PopupWithImage(configuration.zoomSelector);
const popupWithForm = new PopupWithForm(
  ".popup_add-card",
  handleAddCardFormSubmit
);
const popupProfile = new PopupWithForm(
  ".popup_edit-profile",
  handleProfileFormSubmit
);
const popupEditAvatar = new PopupWithForm(
  ".popup_edit-avatar",
  handleAvatarChanging
);
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

formValidation.enableValidation();
cardValidation.enableValidation();
avatarValidation.enableValidation();

popupWithForm.setEventListeners();
popupEditAvatar.setEventListeners();
popupWithImage.setEventListeners();
popupProfile.setEventListeners();
popupConfirm.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  const infoObject = userInfo.getUserInfo();
  popupProfile.setInputValues(infoObject);
  popupProfile.open();
});
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
