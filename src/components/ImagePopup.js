import React from "react"

function ImagePopup(props) {

  //Переменная для присвоения класса открытого попапа
  let open = null

  //Проверка стэйта
  if (props.card.link) {
    open = 'popup_opened'
  }

  return (
    <div className={`image-popup popup popup_type_image ${open}`}>
      <div className="image-popup__container">
        <button className="popup__close-button popup__close-button_type_image" type="button" aria-label="Закрыть" onClick={props.onClose}/>
        <img src={`${props.card.link}`} alt="this-pic" className="image-popup__image" />
        <h2 className="image-popup__title">{props.card.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup