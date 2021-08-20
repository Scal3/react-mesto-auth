import React from "react"

function ErrorPopup(params) {
  return (
    <div className="popup popup_type_error">
      <div className="popup__container popup__container_type_error">
        <h2 className="popup__heading popup__heading_type_error">Ошибка =(</h2>
        <p className="popup__error-message" />
        <button className="popup__close-button" type="button" aria-label="Закрыть" />
      </div>
    </div>
  )
}