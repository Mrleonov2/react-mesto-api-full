import React from "react";
import "./InfoTooltip.css";
import registerSucces from "../../images/icon-succes.svg";
import registerFailed from "../../images/Union.svg";
function InfoTooltip({ isOpen, onClose }) {
  return (
    <div
      className={`popup ${isOpen.isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div className="popup__container">
        <button
          className="popup__button-close button"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="tooltip__image"
          alt="Уведомление"
          src={isOpen.success ? registerSucces : registerFailed}
        />
        {isOpen.success ? (
          <h2 className="tooltip__heading">Вы успешно зарегистрировались!</h2>
        ) : (
          <h2 className="tooltip__heading">
            Что-то пошло не так!Попробуйте ещё раз.
          </h2>
        )}
      </div>
    </div>
  );
}

export default InfoTooltip;
