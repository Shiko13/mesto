export default class UserInfo {
    constructor({ titleSelector, subtitleSelector, avatarSelector }) {
        this._title = document.querySelector(titleSelector);
        this._subtitle = document.querySelector(subtitleSelector);
        this._avatar = document.querySelector(avatarSelector);
        this._data = {};
    }

    getUserInfo() {
        return this._data;
    }

    setUserInfo(data) {
        this._data = data;
        this._title.textContent = data.name;
        this._subtitle.textContent = data.about;
    }

    setUserAvatar(data) {
        this._data = data;
        this._avatar.src = data.avatar;
    }
}