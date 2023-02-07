const popupEditProfile = document.querySelector(".popup_edit-profile");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonClosePopupEditProfile = popupEditProfile.querySelector(".popup__close-button");
const popupEditForm = popupEditProfile.querySelector(".popup__edit-form");
const popupEditFormInputTitle = popupEditForm.querySelector(".popup__input_type_title");
const popupEditFormInputSubtitle = popupEditForm.querySelector(
  ".popup__input_type_subtitle"
);
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const cards = document.querySelector(".cards");
const elementTemplate = cards
  .querySelector("#element-template")
  .content.querySelector(".element");
const popupAddCard = document.querySelector(".popup_add-card");
const profileAddButton = document.querySelector(".profile__add-button");
const buttonClosePopupAddCard = popupAddCard.querySelector(".popup__close-button");
const popupAddCardInputTitle = popupAddCard.querySelector('.popup__input_type_title');
const popupAddCardInputSubtitle = popupAddCard.querySelector('.popup__input_type_subtitle');

const popupZoomCard = document.querySelector('.popup_zoom-card');
const ZoomImage = document.querySelector('.zoom__image');
const ZoomTitle = document.querySelector('.zoom__title');
const buttonClosePopupZoomCard = popupZoomCard.querySelector(".popup__close-button");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function openPopupEditProfile(popup) {
  popupEditFormInputTitle.value = profileTitle.textContent;
  popupEditFormInputSubtitle.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
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
  renderCard(card);
  closePopup(popupAddCard);
  resetForm(evt.target);
}

function addCard(elem) {
  const cloneCard = elementTemplate.cloneNode(true);
  const cloneCardTitle = cloneCard.querySelector(".element__title");
  const cloneCardImage = cloneCard.querySelector(".element__image");

  cloneCard.querySelector('.element__delete-button').addEventListener('click', function (evt) {
    evt.target.parentElement.remove()
  });
  cloneCard.querySelector(".element__like-button").addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like-button_active")
  });
  cloneCard.querySelector('.element__image').addEventListener('click', function (evt) {
    const cardTitle = evt.target.closest('.element').querySelector('.element__title'); 
    ZoomImage.src = evt.target.src; 
    ZoomImage.alt = evt.target.alt; 
    ZoomTitle.textContent = cardTitle.textContent; 
    openPopup(popupZoomCard); 
  });

  cloneCardImage.src = elem.link;
  cloneCardImage.alt = `"${elem.name}"`;
  cloneCardTitle.textContent = elem.name;

  return cloneCard;
}

function renderCard(cardData) {
  const card = addCard(cardData);
  cards.prepend(card);
}

function fillByInitialCards(initCards) {
  initCards.forEach((elem) => {
    renderCard(elem);
  });
}

function resetForm(form) {
  form.reset();
};

fillByInitialCards(initialCards);

buttonEditProfile.addEventListener("click", function () {openPopupEditProfile(popupEditProfile)});
profileAddButton.addEventListener("click", function () {openPopup(popupAddCard)});
buttonClosePopupEditProfile.addEventListener("click", function () {closePopup(popupEditProfile)});
buttonClosePopupAddCard.addEventListener("click", function () {closePopup(popupAddCard)});
buttonClosePopupZoomCard.addEventListener("click", function () {closePopup(popupZoomCard)});
popupEditForm.addEventListener("submit", submitEditProfileForm);
popupAddCard.addEventListener("submit", submitAddCardForm);

