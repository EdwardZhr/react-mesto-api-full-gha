import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import {useEffect, useState} from 'react';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import {Route, Routes, useNavigate, useLocation} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth'
import { InfoTooltip } from './InfoTooltip';


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [selectedCard,  setSelectedCard] = useState({name: '', link: ''});
    const [currentUser,  setCurrentUser] = useState({about: '', avatar: '', cohort: '', name: '', _id: ''});
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [toolTipStatus, setToolTipStatus] = useState('')

    const location = useLocation()
    const navigate = useNavigate();

    const handleLogin = (password, email) => {
        auth.authorize(password, email)
        .then((data) => {
            if (data.token){
            setLoggedIn(true);
            setEmail(email);
            navigate('/', {replace: true});
        }
      })
        .catch(err => {
            handleToolTipStatus('error')
            handleInfoTooltipOpen()
        } );
      }

    const handleRegister = (password, email) => {
        auth.register(password, email)
        .then((res) => {
            navigate('/sign-in', {replace: true});
            handleToolTipStatus('ok');
            handleInfoTooltipOpen(true);
            })
        .catch(err => {
            handleToolTipStatus('error')
            handleInfoTooltipOpen()
        });
      }  

    useEffect(() => {
        handleTokenCheck();
      }, [loggedIn])

    useEffect(() => {
        if (!loggedIn) {
            return
        }
        api.getProfile()
        .then((profileData)=>{ 
            setCurrentUser(profileData);
      })
        .catch((err)=>{ 
          console.log(err);
      });
  
      }, [loggedIn])
      
      useEffect(() => {
        if (!loggedIn) {
            return
        }
        api.getInitialCards()
        .then((initialCards)=>{
            setCards(initialCards);
      })
        .catch((err)=>{ 
          console.log(err);
      });
  
      }, [loggedIn])

    const handleTokenCheck = () => {
        const token = localStorage.getItem('token'); 
        if (token){
        auth.checkToken(token).then((res) => {
            if (res){
            setLoggedIn(true);
            setEmail(res.email);
            navigate("/", {replace: true})
            }
        })
        .catch((err)=>{ 
            console.log(err);
        });
        }
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleInfoTooltipOpen() {
        setIsInfoTooltipOpen(true)
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsInfoTooltipOpen(false);
        setSelectedCard({name: '', link: ''})
    }

    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link

    useEffect(() => {
      function closeByEscape(evt) {
        if(evt.key === 'Escape') {
          closeAllPopups();
        }
      }
      if(isOpen) {
        document.addEventListener('keydown', closeByEscape);
            return () => {
            document.removeEventListener('keydown', closeByEscape);
        }
      }
    }, [isOpen]) 
  
    function handleToolTipStatus(status) {
        setToolTipStatus(status)
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked).then((newCard)=>{
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err)=>{ 
            console.log(err);
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(()=>{
            setCards((state) => state.filter((c) => c._id !== card._id))
        })
        .catch((err)=>{ 
            console.log(err);
        });
    }

    function handleUpdateUser(info) {
        setIsLoading(true);
        api.editProfile(info).then((newInfo)=>{
            setCurrentUser(newInfo);
            closeAllPopups()
        })
        .catch((err)=>{ 
            console.log(err);
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

    function handleUpdateAvatar(info) {
        setIsLoading(true);
        api.changeAvatar(info.avatar).then((newInfo)=>{
            setCurrentUser(newInfo);
            closeAllPopups()
        })
        .catch((err)=>{ 
            console.log(err);
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

    function handleAddPlace(card) {
        setIsLoading(true);
        api.addCard(card).then((newCard)=>{
            setCards([newCard, ...cards])
            closeAllPopups()
        })
        .catch((err)=>{ 
            console.log(err);
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="body">
                <div className="page">
                    <Header email={email} setEmail={setEmail} location={location}/>

                    <Routes>
                        <Route path="/" element={<ProtectedRoute element={Main} 
                            loggedIn={loggedIn}
                            cards={cards} 
                            onCardDelete={handleCardDelete} 
                            onCardClick={setSelectedCard} 
                            onCardLike={handleCardLike} 
                            onEditProfile={handleEditProfileClick} 
                            onAddPlace={handleAddPlaceClick} 
                            onEditAvatar={handleEditAvatarClick}/>}  />
                        <Route path="/sign-up" element={<Register handleRegister={handleRegister}/>} />
                        <Route path="/sign-in" element={<Login handleLogin={handleLogin} /> } />
                    </Routes>     
                    
                    <Footer />

                    <EditProfilePopup isLoading={isLoading} isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} onClose={closeAllPopups}></EditProfilePopup>

                    <EditAvatarPopup isLoading={isLoading} isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups}></EditAvatarPopup>

                    <AddPlacePopup isLoading={isLoading} isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlace} onClose={closeAllPopups}></AddPlacePopup>

                    <PopupWithForm name='delete' title='Вы уверены?' buttonText='Да'/>

                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                    
                    <InfoTooltip isOpen={isInfoTooltipOpen} toolTipStatus={toolTipStatus} onClose={closeAllPopups}  setEmail={setEmail} />
                
                </div>
            </div>
        </CurrentUserContext.Provider>
  );
}

export default App;
