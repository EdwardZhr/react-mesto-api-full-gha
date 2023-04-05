
import React from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';

function AddPlacePopup(props) {


    const {values, handleChange} = useForm({});

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onAddPlace({
          name: values.name,
          link: values.link
        });


      }

    return(
        <PopupWithForm name='add' title='Новое место' onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} buttonText={props.isLoading ? 'Сохранение...' : 'Создать'}>
            <label className="popup__field">
                <input onChange={handleChange} value={values.name || ''} type="text" name="name" placeholder="Новое место" className="popup__input popup__input_type_location-name" id="location-name-input" required minLength="2" maxLength="30"/>
                <span className="popup__input-error location-name-input-error"></span>
            </label>
            <label className="popup__field">
                <input onChange={handleChange} value={values.link || ''} type="url" name="link" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" id="link-input" required/>
                <span className="popup__input-error link-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;