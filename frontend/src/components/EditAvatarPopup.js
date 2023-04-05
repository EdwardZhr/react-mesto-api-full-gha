import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

    const avatarInput = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
          avatar: avatarInput.current.value,
        });
      } 


    return(
        <PopupWithForm name='avatar' title='Обновить аватар' onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}>
            <label className="popup__field">
                    <input ref={avatarInput} type="text" name="avatar" defaultValue="" placeholder="Введите URL" className="popup__input popup__input_type_avatar" id="avatar-input" required minLength="2"/>
                    <span className="popup__input-error avatar-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;