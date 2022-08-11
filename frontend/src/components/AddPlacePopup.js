import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup(props) {
  const [cardTitle, setCardTitle] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");
  useEffect(() => {
    setCardTitle("");
    setCardLink("");
  }, [props.isOpen]);
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ name: cardTitle, link: cardLink });
  }
  function handleChange(e) {
    const newData = {
      name: cardTitle,
      link: cardLink,
      [e.target.name]: e.target.value,
    };
    setCardTitle(newData.name);
    setCardLink(newData.link);
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="add-place"
      submitText={`${props.isLoading ? "Создание...":"Создать"}`}
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-label">
        <input
          className="popup__input popup__input_type_place-name"
          type="text"
          placeholder="Название"
          name="name"
          id="title-input"
          minLength="2"
          maxLength="30"
          value={cardTitle}
          onChange={handleChange}
          required
        />
        <span className="popup__input-error title-input-error"></span>
      </label>
      <label className="popup__form-label">
        <input
          className="popup__input popup__input_type_image"
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          id="image-url-input"
          value={cardLink}
          onChange={handleChange}
          required
        />
        <span className="popup__input-error image-url-input-error"></span>
      </label>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
