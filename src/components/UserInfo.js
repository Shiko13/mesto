export default class UserInfo {
    constructor({ titleSelector, subtitleSelector }) {
        this._title = document.querySelector(titleSelector);
        this._subtitle = document.querySelector(subtitleSelector);
    }

    getUserInfo() {
        return {
            title: this._title.textContent,
            subtitle: this._subtitle.textContent
        };
    }

    setUserInfo(data) {
        this._title.textContent = data.title;
        this._subtitle.textContent = data.subtitle;
    }
}