import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { Item, Img } from './ImageGalleryItem.styled';

// Классовый компонент ImageItem
const ImageItem = ({image}) => {
  const [showModal, setShowModal] = useState(false);//Зберігає стан модального вікна (open or close)



  // // Метод перемикання стану модального вікна

  const toggleModal = () => {
    setShowModal(prevModal => !prevModal); // значення showModal
  };


  
    return (
      <>
        <Item>
          <Img
            src={image.webformatURL} // URL smol зображен.
            alt={image.tags} // Теги зображеня
            onClick={toggleModal} // Обробник кліка для відкриття модального вікна
          />
          {showModal && ( // showModal = true, отображаем модальное окно
            <Modal
              largeImageURL={image.largeImageURL} // URL big зображеня
              tags={image.tags} // tag зображеня
              onClose={toggleModal} //Оброблювач для закриття модального вікна.
            />
          )}
        </Item>
      </>
    );
  
}

ImageItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageItem;