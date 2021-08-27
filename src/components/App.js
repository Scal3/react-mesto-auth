import React from 'react'
import { useState, useEffect} from 'react'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'
import * as mestoAuth from '../utils/mestoAuth'
import { useHistory } from 'react-router-dom'



function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);  //Стэйт профиля
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);  //Стэйт карточки
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);  //Стэйт аватара
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});  //Стэйт кликнутой карточки
  const [currentUser, setCurrentUser] = useState({})  //Стэйт данных пользователя
  const [cards, setCards] = useState([]); //Стэйт массива для карточек
  const [loggedIn, setLoggedIn] = useState(false) //Стэйт для защиты роутов
  const [email, setEmail] = useState('') //Стэйт для защиты роутов
  const history = useHistory()


  //Получаем данные пользователя и список карточек
  useEffect(() => {
    Promise.all([api.getUserData(), api.getCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData)
        setCards(cards)
      })
      .catch((e) => {
        console.log(`Ошибка загрузки данных: ${e}`)
      })
    tokenCheck()
  }, [])

 //Проверка токена и подстановка данных
  function tokenCheck() {
    if (localStorage.getItem('token')){
      const token = localStorage.getItem('token');
      mestoAuth.getContent(token)
      .then(res => {
        setEmail(res.data.email)
        setLoggedIn(true)
        history.push('/')
      })
      .catch(err => {
        if(!token) {
          localStorage.removeItem('token')
        }
        console.log(err)
      })
    }
  }

  //Переход основной сайт
  function onLogin(){
    history.push('/')
  }

  //Переход на роут логина
  function switchToLogin(){
    history.push('/sign-in')
  }

  //Переход на роут регистрации
  function switchToRegistration(){
    history.push('/sign-up')
  }

  //Выход из системы
  function signOut(){
    localStorage.removeItem('token');
    history.push('/sign-in');
  }

  //Обработчик для допуска к роуту "/"
  function handleLogin(){
    setLoggedIn(true)
  }

  //Обработчик клика по карточке
  function handleCardClick(card) {
    setSelectedCard(card)
  }

  //Обработчик открытия попапа изменения аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  //Обработчик открытия попапа редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  //Обработчик открытия попапа добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  //Обработчик закрытия всех попапов
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setSelectedCard({name: '', link: ''})
  }

  //Обработчик для обновления информации о пользователе
  function handleUpdateUser({name, about}) {
    api.editProfileInfo({name, about})
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((e) => {
        console.log(`Ошибка обновления информации: ${e}`)
      })
  }

  //Обработчик для обновления аватара
  function handleUpdateAvatar({avatar}) {
    api.edidProfileAvatar({avatar})
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((e) => {
        console.log(`Ошибка обновления аватара: ${e}`)
      })
  }

  //Возможность ставить лайки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.addLike(card)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((e) => {
        console.log(`Ошибка, картинка не лайкнута: ${e}`)
      })
    } else {
        api.removeLike(card)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((e) => {
          console.log(`Ошибка, лайк не снят: ${e}`)
        })
    }
  }

  //Возможность удалить карточку
  function handleCardDelete(card) {
    api.deleteCard(card)
      .then((res) => {
        const newArr = cards.filter((item) => item._id !== card._id)
        setCards(newArr)
      })
      .catch((e) => {
        console.log(`Ошибка удаления карточки: ${e}`)
      })
  }

  //Возможность добавить карточку
  function handleAddPlaceSubmit({name, link}) {
    api.addNewCard({name, link})
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((e) => {
        console.log(`Ошибка добавления карточки: ${e}`)
      })
  }


  return (
    <div>
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>

        <Route path="/" exact>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}


          <ProtectedRoute
            path="/header"
            loggedIn={loggedIn}
            email={email}
            component={Header}
            signOut={signOut}
          />

          <ProtectedRoute
            path="/main"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick}
            cardImageClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <ProtectedRoute
            path="/footer"
            loggedIn={loggedIn}
            component={Footer}
          />

          <ProtectedRoute
            path="/EditProfilePopup"
            loggedIn={loggedIn}
            component={EditProfilePopup}
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser}
          />

          <ProtectedRoute
            path="/EditAvatarPopup"
            loggedIn={loggedIn}
            component={EditAvatarPopup}
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ProtectedRoute
            path="/AddPlacePopup"
            loggedIn={loggedIn}
            component={AddPlacePopup}
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups} 
            onAddPlace={handleAddPlaceSubmit}
          />

          <ProtectedRoute
            path="/ImagePopup"
            loggedIn={loggedIn}
            component={ImagePopup}
            card={selectedCard} 
            onClose={closeAllPopups}
          />
        </Route>  

        <Route path="/sign-up">
          <Register switchToLogin={switchToLogin}></Register>
        </Route>

        <Route path="/sign-in">
          <Login handleLogin={handleLogin} switchToRegistration={switchToRegistration} onLogin={onLogin}></Login>
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  </div>
  )
}

export default App



