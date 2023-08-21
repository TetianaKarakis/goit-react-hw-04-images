import { useEffect } from 'react';

import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';




//class component Modal
const Modal = ({ largeImageURL, tags, onClose }) => {

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose(); // Закриваємо модальне вікно під час натискання клавіші Escape
      }
    };

  window.addEventListener('keydown', handleKeyDown); // Добавляємо слухач подій на натискання клавіатури.
    document.body.style.overflow = 'hidden';
     
 
  return () => {
    window.removeEventListener('keydown', handleKeyDown); // remuve слухач подій на натискання клавіатури.
    document.body.style.overflow = 'visible';
  };
}, [onClose]);

  // Обробник кліка  модального вікна

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose(); // Закриваємо модальне вікно під час кліку
    }
  };
 
  return (
      <Overlay onClick={handleBackdropClick}>
        <ModalWindow>
          <img src={largeImageURL} alt={tags} />
        </ModalWindow>
      </Overlay>
    
    );
  
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;