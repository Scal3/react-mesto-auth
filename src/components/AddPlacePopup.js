import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [name, setName] = React.useState('') // Стэйт имени пользователя
  const [link, setLink] = React.useState('')  // Стэйт описания пользователя
  
  const handleName = e => setName(e.target.value)

  const handleLink = e => setLink(e.target.value)

  function handleSubmit(e) {
    e.preventDefault();
    
    props.onAddPlace({
      name: name,
      link: link,
    });

    setName('')
    setLink('')
  }

  return (
    <PopupWithForm name="card" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} buttonText="Добавить" onSubmit={handleSubmit}>
      <div className="popup__section">
        <input type="text" required className="popup__input popup__input_type_title" name="name" placeholder="Название" minLength='2' maxLength='30' value={name} onChange={handleName} />
        <span className="popup__input-error popup__input-error_position_up" />
      </div>
      <div className="popup__section">
        <input type="url" required className="popup__input popup__input_type_link" name="link" placeholder="Ссылка на картинку" value={link} onChange={handleLink} />
        <span className="popup__input-error popup__input-error_position_dawn" />
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup