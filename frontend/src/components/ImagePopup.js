function ImagePopup({card, onClose}) {

    return(
        <div className={card.link ? `popup image-popup popup_opened` : `popup image-popup `}>
            <div className="popup__container popup__container_type_photo">
                <button type="button" className="popup__close-btn popup__close-btn_type_photo" onClick={onClose}></button>
                <img src={card?.link} alt={card?.link} className="popup__img"/>
                <p className="popup__image-name">{card?.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;