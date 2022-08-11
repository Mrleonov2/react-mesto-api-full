function ImagePopup({ card, onClose, name, isOpen}) {
  return (
    <div
      className={`popup popup_type_${name} 
    ${isOpen ? "popup_opened" : ''}
      `}
      aria-label="popup-image"
      onClick={onClose}
    >
      <figure className="popup__image-container">
        <button
          className="popup__button-close button"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__image-caption">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
