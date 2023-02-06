const popupEditProfile = document.querySelector(".popup_edit-profile");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupCloseButtonEdit = popupEditProfile.querySelector(".popup__close-button");
const popupEditForm = popupEditProfile.querySelector(".popup__edit-form");
const popupInputTitleEdit = popupEditForm.querySelector(".popup__input_type_title");
const popupInputSubtitleEdit = popupEditForm.querySelector(
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
const popupCloseButtonAdd = popupAddCard.querySelector(".popup__close-button");
const popupInputTitleAdd = popupAddCard.querySelector('.popup__input_type_title');
const popupInputSubtitleAdd = popupAddCard.querySelector('.popup__input_type_subtitle');

const popupZoomCard = document.querySelector('.popup_zoom-card');
const ZoomImage = document.querySelector('.zoom__image');
const ZoomTitle = document.querySelector('.zoom__title');
const popupCloseButtonZoom = popupZoomCard.querySelector(".popup__close-button");

const elements = document.querySelector(".elements");
const initialCards = [
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

function openPopupEdit() {
  popupInputTitleEdit.value = profileTitle.textContent;
  popupInputSubtitleEdit.value = profileSubtitle.textContent;
  popupEditProfile.classList.add("popup_opened");
}

function openPopupAdd() {
  popupAddCard.classList.add("popup_opened");
}

function openPopupZoom() {
  popupZoomCard.classList.add("popup_opened");
}

function closePopupEdit() {
  popupEditProfile.classList.remove("popup_opened");
}

function closePopupAddCard() {
  popupAddCard.classList.remove("popup_opened");
}

function closePopupZoom() {
  popupZoomCard.classList.remove("popup_opened");
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputTitleEdit.value;
  profileSubtitle.textContent = popupInputSubtitleEdit.value;
  closePopupEdit();
}

function handleFormClick(evt) {
  if (evt.target.classList.contains("element__delete-button")) {
    evt.target.closest(".element").remove(); }
  else if (evt.target.classList.contains("element__like-button")) {
      evt.target.classList.toggle("element__like-button_active");
  } else if (evt.target.classList.contains('element__image')) {
    const cardTitle = evt.target.closest('.element').querySelector('.element__title');
    ZoomImage.src = evt.target.src;
    ZoomImage.alt = evt.target.alt;
    ZoomTitle.textContent = cardTitle.textContent;
    openPopupZoom(popupZoomCard);
  }
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: popupInputTitleAdd.value,
    link: popupInputSubtitleAdd.value,
  }
  renderCard(addCard(card));
  closePopupAddCard(evt);
  resetForm(evt.target);
}

function addCard(elem) {
  const cloneCard = elementTemplate.cloneNode(true);
  const cloneCardTitle = cloneCard.querySelector(".element__title");
  const cloneCardImage = cloneCard.querySelector(".element__image");

  cloneCardImage.src = elem.link;
  cloneCardImage.alt = `"${elem.name}"`;
  cloneCardTitle.textContent = elem.name;

  return cloneCard;
}

function renderCard(elem = addCard(elems)) {
  cards.prepend(elem);
}

function fillCards(initCards) {
  initCards.forEach((elem) => {
    renderCard(addCard(elem));
  });
}

function resetForm(form) {
  form.reset();
};

fillCards(initialCards);

profileEditButton.addEventListener("click", openPopupEdit);
profileAddButton.addEventListener("click", openPopupAdd);
popupCloseButtonEdit.addEventListener("click", closePopupEdit);
popupCloseButtonAdd.addEventListener("click", closePopupAddCard);
popupCloseButtonZoom.addEventListener("click", closePopupZoom);
cards.addEventListener("click", handleFormClick);
popupEditForm.addEventListener("submit", handleFormEditSubmit);
popupAddCard.addEventListener("submit", handleFormAddSubmit);


