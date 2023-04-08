class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
    }

    _getToken() {
        const token = localStorage.getItem('token');
        return token
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    } 

    _request(url, options) {
        return fetch(url, options).then(this._getResponseData)
    }

    getInitialCards() {
        return this._request(`${this._baseUrl}/cards`, {
            headers: {
                authorization: `Bearer ${this._getToken()}`,
                'Content-Type': 'application/json'
              }
        });
    }
  
    getProfile() {
        const token = localStorage.getItem('token');
        return this._request(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${this._getToken()}`,
                'Content-Type': 'application/json'
              }
        }); 
    }

    editProfile({name, about}) {
        const token = localStorage.getItem('token');
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${this._getToken()}`,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name,
                about
              })
        });
    }

    addCard({name, link}) {
        const token = localStorage.getItem('token');
        return this._request(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${this._getToken()}`,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name,
                link
              })
        }); 
    }

    deleteCard(cardId) {
        const token = localStorage.getItem('token');
        return this._request(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._getToken()}`,
                'Content-Type': 'application/json'
              }
        })
    }

    deleteLike(cardId) {
        const token = localStorage.getItem('token');
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._getToken()}`,
                'Content-Type': 'application/json'
              }
        })
    }

    addLike(cardId) {
        const token = localStorage.getItem('token');
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${this._getToken()}`,
                'Content-Type': 'application/json'
              }
        })
    }

    changeLikeCardStatus(cardId, isLiked) {
        return isLiked ? this.deleteLike(cardId) : this.addLike(cardId)
    }

    changeAvatar(avatar) {
        const token = localStorage.getItem('token');
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${this._getToken()}`,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                avatar
              })
        });
    }
  }

  const api = new Api({
    baseUrl: 'https://api.edward.nomoredomains.monster',
  });

export default api;

  