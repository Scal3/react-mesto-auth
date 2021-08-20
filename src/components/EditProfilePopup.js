import React from 'react'
import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext)


  const [name, setName] = useState('') // Стэйт имени пользователя
  const [description, setDescription] = useState('')  // Стэйт описания пользователя


  // Данные текущего пользователя из API будут использованы в управляемых компонентах
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);


  const handleName = e => setName(e.target.value)

  const handleDescription = e => setDescription(e.target.value)

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  } 


  return (
    <PopupWithForm name="profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} buttonText="Сохранить" onSubmit={handleSubmit}>
      <div className="popup__section">
        <input type="text" required className="popup__input popup__input_type_name" name="name" placeholder="Введите ваше имя" minLength="2" maxLength="40" onChange={handleName} value={name || ''}/>
        <span className="popup__input-error popup__input-error_position_up" />
      </div>
      <div className="popup__section">
        <input type="text" required className="popup__input popup__input_type_job" name="about" placeholder="Введите вашу профессию" minLength="2" maxLength="200" onChange={handleDescription} value={description || ''}/>
        <span className="popup__input-error popup__input-error_position_dawn" />
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup