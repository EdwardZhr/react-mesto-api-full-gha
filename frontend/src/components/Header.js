import logo from '../images/logo.svg';
import {Route, Routes, Link} from 'react-router-dom';

function Header ({email, setEmail, location}) {

    function signOut(){
        if (location.pathname!== '/') {
            return
        }
        localStorage.removeItem('token');
        setEmail('')
        console.log(location)
  }

    return (
        <header className="header">
            <img src={logo} alt="Логотип" className="header__logo"/>
            <p className="header__email">{email}</p>
            <Routes>
                <Route path='/sign-up' element={<Link to='/sign-in' className="header__link">Войти</Link>} />
                <Route path='/sign-in' element={<Link to='/sign-up' className="header__link">Регистрация</Link>} />
                <Route path='/' element={<Link to='/sign-in' onClick={signOut} className="header__link">Выйти</Link>} />
            </Routes>
        </header>
    )
}

export default Header;