let popup = document.querySelector(".popup");
let popupEditButton = document.querySelector(".profile__edit-button");
let popupCloseButton = document.querySelector(".popup__close-button");
let editForm = document.querySelector(".popup__edit-form");
let inputTitle = editForm.querySelector(".popup__input_title");
let inputSubtitle = editForm.querySelector(".popup__input_subtitle");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

function openPopup() {
    popup.classList.add("popup_opened");
    inputTitle.value = profileTitle.textContent;
    inputSubtitle.value = profileSubtitle.textContent;
}

function closePopup() {
    popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = inputTitle.value;
    profileSubtitle.textContent = inputSubtitle.value;
    closePopup();
}

popupEditButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
editForm.addEventListener('submit', handleFormSubmit);