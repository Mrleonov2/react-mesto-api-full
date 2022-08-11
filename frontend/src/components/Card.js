import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Card({ onCardClick, onCardLike, onCardDelete, item }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = item.owner._id === currentUser._id;
  const isLiked = item.likes.some((i) => i._id === currentUser._id);
  const cardDeleteButtonClassName = `cards__delete button ${
    isOwn ? "cards__delete_visible" : "cards__delete_hidden"
  }`;

  const cardLikeButtonClassName = `cards__like button ${
    isLiked ? "cards__like_active" : ""
  }`;

  function handleImageClick() {
    onCardClick(item);
  }
  function handleLikeClick() {
    onCardLike(item, isLiked);
  }
  function handleDeleteClick() {
    onCardDelete(item);
  }
  return (
    <li className="cards__item">
      <img
        className="cards__image"
        src={item.link}
        alt={item.name}
        onClick={handleImageClick}
      />
      <h2 className="cards__title">{item.name}</h2>
      <button
        className={cardLikeButtonClassName}
        onClick={handleLikeClick}
        type="button"
      ></button>
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
      ></button>
      <div className="cards__like-count">{`${item.likes.length}`}</div>
    </li>
  );
}
export default Card;
