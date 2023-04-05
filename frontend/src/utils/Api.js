class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._token = localStorage.getItem('token');
      this._headers = {
        authorization: `Bearer ${this._token}`,
        'Content-Type': 'application/json'
      }
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
            headers: this._headers
        });
    }
  
    getProfile() {
        return this._request(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }); 
    }

    editProfile({name, about}) {
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
        return this._request(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }

    deleteLike(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
    }

    addLike(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
    }

    changeLikeCardStatus(cardId, isLiked) {
        return isLiked ? this.deleteLike(cardId) : this.addLike(cardId)
    }

    changeAvatar(avatar) {
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
    baseUrl: 'http://localhost:3000',
    headers: {
      authorization: '8ade5112-01a1-4e6d-a5ab-052aeef1aded',
      'Content-Type': 'application/json'
    }
  });

export default api;

  