import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("Имя Пользователя");
  const [description, setDescription] = React.useState("О Себе");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  function handleChange(e) {
    const newData = {
      name,
      about: description,
      [e.target.name]: e.target.value,
    };
    setName(newData.name);
    setDescription(newData.about);
  }
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      submitText={`${props.isLoading ? "Cохранение...": "Cохранить"}`}
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      children
    >
      <label className="popup__form-label">
        <input
          className="popup__input popup__input_type_name"
          type="text"
          placeholder="Ф.И.О."
          name="name"
          minLength="2"
          maxLength="40"
          id="name-input"
          value={name || ""}
          onChange={handleChange}
          required
        />
        <span className="popup__input-error name-input-error"></span>
      </label>
      <label className="popup__form-label">
        <input
          className="popup__input popup__input_type_job"
          type="text"
          placeholder="О себе"
          name="about"
          minLength="2"
          maxLength="200"
          id="job-input"
          value={description || ""}
          onChange={handleChange}
          required
        />
        <span className="popup__input-error job-input-error"></span>
      </label>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
