import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext'

function Card ({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    
    const isOwn = card.owner._id === currentUser._id || card.owner === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = ( 
        `element__like ${isLiked && 'element__like_active'}` 
      );; 

    function handleClick() {
        onCardClick(card);
      }

    function handleLikeClick() {
        onCardLike(card);
      }    

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <div className="element">
            <div className="element__picture-wrapper">
                <img src={card.link} alt={card.name} className="element__picture"/>
            </div>
            <div className="element__mask" onClick={handleClick}></div>
            {isOwn && <button className='element__delete' onClick={handleDeleteClick}/>}
            <div className="element__wrapper">
                <h2 className="element__title">{card.name}</h2>
                <div className="element_like-wrapper">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <div className="element__like-count">{card.likes.length}</div>
                </div>
            </div>
        </div>
    )
}

export default Card;