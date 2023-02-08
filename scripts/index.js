const popupElements = document.querySelectorAll('.popup')
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
const popupAddForm = popupAddCard.querySelector('.popup__add-form');

const popupZoomCard = document.querySelector('.popup_zoom-card');
const zoomImage = document.querySelector('.zoom__image');
const zoomTitle = document.querySelector('.zoom__title');
const buttonClosePopupZoomCard = popupZoomCard.querySelector(".popup__close-button");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByPressEscape);
}

function openPopupEditProfile() {
  popupEditFormInputTitle.value = profileTitle.textContent;
  popupEditFormInputSubtitle.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupByPressEscape);
  popupAddForm.reset();
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
  renderCard(card);
  evt.target.reset();
  closePopup(popupAddCard);
}

function removeDeleteButton(evt) {
  evt.target.parentElement.remove();
}

function toggleLikeButton(evt) {
  evt.target.classList.toggle("element__like-button_active");
}

function fillZoomCard(evt) {
  const cardTitle = evt.target.closest('.element').querySelector('.element__title'); 
  zoomImage.src = evt.target.src; 
  zoomImage.alt = evt.target.alt; 
  zoomTitle.textContent = cardTitle.textContent; 
  openPopup(popupZoomCard); 
}

function addCard(elem) {
  const cloneCard = elementTemplate.cloneNode(true);
  const cloneCardTitle = cloneCard.querySelector(".element__title");
  const cloneCardImage = cloneCard.querySelector(".element__image");

  cloneCard.querySelector('.element__delete-button').addEventListener('click', removeDeleteButton);
  cloneCard.querySelector(".element__like-button").addEventListener("click", toggleLikeButton);
  cloneCard.querySelector('.element__image').addEventListener('click', fillZoomCard);

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

fillByInitialCards(initialCards);

buttonEditProfile.addEventListener("click", function () {openPopupEditProfile()});
profileAddButton.addEventListener("click", function () {openPopup(popupAddCard)});
popupEditForm.addEventListener("submit", submitEditProfileForm);
popupAddCard.addEventListener("submit", submitAddCardForm);

