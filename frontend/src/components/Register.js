import React from 'react';
import {Link} from 'react-router-dom';
import useForm from '../hooks/useForm';
import Form from './Form';

const Register = ({handleRegister}) => {
    const {values, handleChange} = useForm({});

    const handleSubmit = (e) => {
      e.preventDefault();
      const {password, email} = values;
      handleRegister(password, email)
    }

    return (
      <Form title='Регистрация'  buttonText='Зарегестрироваться' values={values} onSubmit={handleSubmit}  onChange={handleChange}>        
        <Link to="/sign-in" className="form__link">Уже зарегистрированы? Войти</Link>
      </Form>
      )
}

export default Register;