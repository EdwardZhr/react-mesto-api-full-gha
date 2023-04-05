import ok from '../images/ok.svg';
import error from '../images/error.svg';

export const InfoTooltip = ({isOpen, onClose, toolTipStatus}) => {
    return (
        <div className={isOpen ? `tooltip tooltip_opened`: `tooltip`}>
            <div className={`tooltip__container`}>
                <img src={toolTipStatus==='ok' ? ok : error} alt={toolTipStatus==='ok' ? 'ok' : 'error'} className="tooltip__img"/>
                <p className="tooltip__text">{toolTipStatus==='ok' ? 'Вы успешно зарегистрировались!' : `Что-то пошло не так!
Попробуйте ещё раз.`}</p>
                <button className="tooltip__close-btn" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}