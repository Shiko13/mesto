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

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: popupInputTitleAdd.value,
    link: popupInputSubtitleAdd.value,
  }
  renderCard(card);
  closePopupAddCard(evt);
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
    openPopupZoom(popupZoomCard); 
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

function fillCards(initCards) {
  initCards.forEach((elem) => {
    renderCard(elem);
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
popupEditForm.addEventListener("submit", handleFormEditSubmit);
popupAddCard.addEventListener("submit", handleFormAddSubmit);

