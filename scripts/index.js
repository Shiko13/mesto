let popup = document.querySelector(".popup");
let popupEditButton = document.querySelector(".profile__edit-button");
let popupCloseButton = popup.querySelector(".popup__close-button");
let editForm = popup.querySelector(".popup__edit-form");
let inputTitle = editForm.querySelector(".popup__input_type_title");
let inputSubtitle = editForm.querySelector(".popup__input_type_subtitle");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

function openPopup() {
    inputTitle.value = profileTitle.textContent;
    inputSubtitle.value = profileSubtitle.textContent;
    popup.classList.add("popup_opened");
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