export default class Section {
    constructor({ renderer }, selector) {
        this._renderer = renderer;
        this._selector = document.querySelector(selector);;
    }

    renderItems(items) {
        items.forEach((item) => {
            this._addItemReverse(this._renderer(item));
        });
    }

    addItem(item) {
        this._selector.prepend(item);
    }

    _addItemReverse(item) {
        this._selector.append(item);
    }
}