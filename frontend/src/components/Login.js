import React from 'react';
import Form from './Form'
import useForm from '../hooks/useForm';


const Login = ({handleLogin}) => {
  const {values, handleChange, setValues} = useForm({});


  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values.password, values.email);
    setValues({password: '', email: ''});
  }

  return (
    <Form title='Вход'  buttonText='Войти' values={values} onSubmit={handleSubmit}  onChange={handleChange}/>        
    )
}

export default Login;