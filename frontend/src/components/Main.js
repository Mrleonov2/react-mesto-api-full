import React from "react";
import { api } from "../utils/Api.js";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-contatiner" onClick={onEditAvatar}>
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></div>
          <div className="profile__avatar-overlay"></div>
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <h2 className="profile__job">{currentUser.about}</h2>
          <button
            className="profile__button-edit button"
            type="button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="profile__button-add button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="places" aria-label="cards-list">
        <ul className="cards">
          {cards.map((item, i) => (
            <Card
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
