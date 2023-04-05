function PopupWithForm({isOpen, onClose, name, title, buttonText, children, onSubmit}) {
    return (
        <div className={isOpen ? `popup ${name}-popup popup_opened` : `popup ${name}-popup`}>

            <form action="#" onSubmit={onSubmit} className={`popup__container popup__container_form popup__container_type_${name}`}>
                <fieldset className="popup__set">
                    <button className="popup__close-btn" type="button" onClick={onClose}></button>
                    <h3 className="popup__title">{title}</h3>
                    {children}
                    <button className="popup__save-btn">{buttonText}</button>
                </fieldset>

            </form>
        </div>
    )
}

export default PopupWithForm;