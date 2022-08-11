function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  submitText,
  onChange,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div className="popup__container">
        <h2 className="popup__heading">{title}</h2>
        <button
          className="popup__button-close button"
          type="button"
          onClick={onClose}
        ></button>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={name}
          id={name}
          onSubmit={onSubmit}
          onChange={onChange}
        >
          <fieldset className="popup__input-container">
            {children}
            <button className="popup__submit button" type="submit">
              {submitText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
