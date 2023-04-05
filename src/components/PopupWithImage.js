import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._title = this._popup.querySelector('.zoom__title');
        this._image = this._popup.querySelector('.zoom__image');
    }

    open(name, link) {
        this._title.textContent = name;
        this._image.src = link;
        this._image.alt = name;
        super.open();
    }
}