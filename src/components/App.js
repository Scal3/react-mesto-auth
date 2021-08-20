import React from 'react'
import { useState, useEffect } from 'react'

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);  //Стэйт профиля
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);  //Стэйт карточки
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);  //Стэйт аватара
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});  //Стэйт кликнутой карточки
  const [currentUser, setCurrentUser] = useState({})  //Стэйт данных пользователя
  const [cards, setCards] = useState([]); //Стэйт массива для карточек


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
  }, [])


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
      <Header />

      <Main 
      onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick} 
      onEditAvatar={handleEditAvatarClick} 
      cardImageClick={handleCardClick}
      cards={cards}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete}
      />

      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </CurrentUserContext.Provider>
  </div>
  )
}

export default App