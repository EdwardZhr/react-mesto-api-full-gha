import React from 'react';

const Form = ({title, buttonText, children, values, onChange, onSubmit}) => {
    return (
        <div className="form">
            <form action="#" className="form-container" onSubmit={onSubmit}>
                <fieldset className="form__set">
                    <h3 className="form__title">{title}</h3>
                        <label className="form__field">
                            <input  onChange={onChange} value={values.email || ''} type="email" name="email" placeholder="Email" className="form__input form__input_type_email" id="emai-input" required minLength="2" maxLength="40"/>
                            <span className="form__input-error name-input-error"></span>
                        </label>
                        <label className="form__field">
                            <input onChange={onChange} value={values.password || ''} type="password" name="password"  placeholder="Пароль" className="form__input form__input_type_password" id="password-input" required minLength="2" maxLength="15"/>
                            <span className="form__input-error vocation-input-error"></span>
                        </label>
                    <button className="form__submit-btn">{buttonText}</button>
                </fieldset>
                {children}
            </form>
        </div>
    )
}

export default Form;