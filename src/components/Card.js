import React from "react"
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext)  //Контекст с инфой пользователя

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id

  // className для кнопки удаления
  const cardDeleteButtonClassName = (
  `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
  )

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id)

  // className для кнопки лайка
  const cardLikeButtonClassName = (
    `card__like-button ${isLiked ? 'card__like-button_active' : ''}`
  ) 

  // Обработчик лика по картинке
  function handleClick() {
    props.onCardClick(props.card)
  }   

  // Обработчик лика по кнопке лайка
  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  // Обработчик лика по кнопке удаления
  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
      <div className="card card_margin_bottom">
        <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
        <img src={props.card.link} alt={props.card.name} className="card__image" onClick={handleClick}/>
        <div className="card__title-and-button">
          <h2 className="card__title">{props.card.name}</h2>
          <div className="card__container">
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
            <p className="card__like-counter">{props.card.likes.length}</p>
          </div>
        </div>
      </div>
  )
}

export default Card