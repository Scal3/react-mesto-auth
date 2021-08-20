import React from 'react'
import PopupWithForm from './PopupWithForm';
import { useRef } from 'react'

function EditAvatarPopup(props) {

  const inputRef = useRef()// Реф инпута для аватара


  function handleSubmit(e) {
    e.preventDefault()
    
    props.onUpdateAvatar({
      avatar: inputRef.current.value
    })
  }


  return (
    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} buttonText="Изменить" onSubmit={handleSubmit}>
      <div className="popup__section">
        <input type="url" required className="popup__input popup__input_type_update-link" name="link" placeholder="Ссылка на картинку" ref={inputRef}/>
        <span className="popup__input-error popup__input-error_position_up" />
      </div>
    </PopupWithForm>
  )
  
}

export default EditAvatarPopup