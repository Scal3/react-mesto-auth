import React from 'react';
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'


function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);  //Контекст с инфой пользователя

  return (
    <main className="main">
      {/* секция профиля */}
      <section className="profile profile_top_margin">
        <div className="profile__xl-container">
          <img src={currentUser.avatar} alt="фото профиля" className="profile__avatar" onClick={props.onEditAvatar} />
          <div className="profile__xl-container-without-img">
            <div className="profile__name-and-button">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" aria-label="Изменить" onClick={props.onEditProfile}/>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={props.onAddPlace}/>
      </section>
      {/* секция с карточками */}
      <section className="cards">
        {props.cards.map((card) => {
          return (
            <Card key={card._id} card={card} onCardClick={props.cardImageClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
            );
          })}
        </section >

    </main>
  )
}

export default Main