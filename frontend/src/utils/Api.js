class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._token = localStorage.getItem('token');
      this._headers = {
        authorization: `Bearer ${this._token}`,
        'Content-Type': 'application/json'
      }
    }

    _getToken() {
        this._token = localStorage.getItem('token');
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
        this._getToken()
        return this._request(`${this._baseUrl}/cards`, {
            headers: this._headers
        });
    }
  
    getProfile() {
        this._getToken()
        return this._request(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }); 
    }

    editProfile({name, about}) {
        this._getToken()
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
              })
        });
    }

    addCard({name, link}) {
        this._getToken()
        return this._request(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
              })
        }); 
    }

    deleteCard(cardId) {
        this._getToken()
        return this._request(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }

    deleteLike(cardId) {
        this._getToken()
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
    }

    addLike(cardId) {
        this._getToken()
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
    }

    changeLikeCardStatus(cardId, isLiked) {
        return isLiked ? this.deleteLike(cardId) : this.addLike(cardId)
    }

    changeAvatar(avatar) {
        this._getToken()
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
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

  