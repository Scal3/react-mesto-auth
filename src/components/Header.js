import React from "react"
import headerLogo from '../images/logo.svg'

function Header(props) {
  return (
    <header className="header header_top_margin">
      <img className="header__logo" src={headerLogo} alt="mesto russia"></img>
      <div className="header__email-and-btn-container">
        <p className="header__email">{props.email}</p>
        <button onClick={props.signOut} className="header__exit-btn">Выйти</button>
      </div>
    </header>
  )
}

export default Header