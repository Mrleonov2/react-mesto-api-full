import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup(props){
  const avatarRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(
     { avatar: avatarRef.current.value}
    );
  } 
  useEffect(()=>{avatarRef.current.value=''},[props.isOpen])
  return(<PopupWithForm
    title="Обновить аватар"
    name="edit-avatar"
    submitText={`${props.isLoading ? "Cохранение...": "Cохранить"}`}
    
    onClose={props.onClose}
    isOpen={props.isOpen}
    onSubmit={handleSubmit}
    
  >
    <label className="popup__form-label">
      <input
        className="popup__input popup__input_type_avatar"
        type="url"
        placeholder="Ссылка на картинку"
        name="avatar"
        id="avatar-input"
        minLength="2"
        ref={avatarRef}
        required
      />
      <span className="popup__input-error avatar-input-error"></span>
    </label>
  </PopupWithForm>);
}
export default EditAvatarPopup;