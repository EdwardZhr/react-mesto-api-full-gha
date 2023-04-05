import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext'
import useForm from '../hooks/useForm'

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const {values, handleChange, setValues} = useForm({});

    React.useEffect(() => {
        setValues({
            name: currentUser.name, 
            description: currentUser.about
        })
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateUser({
          name: values.name,
          about: values.description
        });
      }

    return (
        <PopupWithForm name='profile' title='Редактировать профиль' onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}>
            <label className="popup__field">
                <input type="text" name="name" value={values.name || ''} onChange={handleChange} placeholder="Укажите имя" className="popup__input popup__input_type_name" id="name-input" required minLength="2" maxLength="40"/>
                <span className="popup__input-error name-input-error"></span>
            </label>
            <label className="popup__field">
                <input type="text" name="description"  value={values.description || ''} onChange={handleChange} placeholder="Укажите профессию" className="popup__input popup__input_type_vocation" id="vocation-input" required minLength="2" maxLength="200"/>
                <span className="popup__input-error vocation-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;