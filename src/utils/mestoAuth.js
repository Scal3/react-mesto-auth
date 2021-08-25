export const BASE_URL = 'https://auth.nomoreparties.co'


//  Регистрация
export function registration (password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    } else {
      return console.log(res.status)
    }
  })
  .then(res => res)
  .catch(err => console.log(err))
}


//  Авторизация
export function authorization (password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  .then(res => res.json())
  .then((data) => {
    if (data.token){
      localStorage.setItem('token', data.token);
      return data;
    }
  })
  .catch(err => console.log(err))
}; 


//  Проверка токена
export function getContent (token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => data)
  .catch(err => console.log(err))
}

