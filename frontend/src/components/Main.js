import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext'

function Main (props) {

    const currentUser = React.useContext(CurrentUserContext);
    

    return (
        <main className="content">
            <section className="profile">
                    <div className="profile__avatar-wrapper" onClick={props.onEditAvatar}>                        
                    <img src={currentUser.avatar} alt="Аватар" className="profile__avatar"/>
                    </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__vocation">{currentUser.about}</p>
                    <button className="profile__edit-btn" onClick={props.onEditProfile}></button>
                </div>
                <button className="profile__add-btn" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {props.cards.map((element)=>{
                    return (<Card card={element} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} onCardClick={props.onCardClick} key={element._id}/>)
                })}
            </section>
        </main>
    )
}

export default Main;