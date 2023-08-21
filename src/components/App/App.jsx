import { useState, useEffect } from 'react';
import * as API from '../../services/api';
import SearchBar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
 
  const [searchName, setSearchName] = useState(''); // Запрос для пошук
  const [images, setImages] = useState([]); // зображеня
  const [currentPage, setCurrentPage] = useState(1); // Номер сторінки
  const [isLoading, setIsLoading] = useState(false); // Індикатор загрудки зображення
  const [totalPages, setTotalPages] = useState(0); 


  useEffect(() => {
    if (searchName === '') {
      return;
    }
    async function addImages() {
      try {
        // Встановлюємо  завантаження
        setIsLoading(true);
        // Отримуємо дані за допомогою API запиту до Pixabay
        const data = await API.getImages(searchName, currentPage);

        if (data.hits.length === 0) {
          // Якщо зображення не знайдено, виводимо повідомлення
          return toast.info('Sorry image not found...', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        // Нормалізуємо отримані зображення
        const normalizedImages = API.normalizedImages(data.hits);

        setImages(prevImages => [...prevImages, ...normalizedImages]); // Додаємо  зображення 
        setIsLoading(false); // Скидаємо  завантаження
        setTotalPages(Math.ceil(data.totalHits / 12)); // загальну кількість сторінок
      } catch {
        toast.error('Something went wrong!', {
          position: toast.POSITION.TOP_RIGHT,
        }); // Якщо сталася помилка, виводимо повідомлення
      } finally {
        setIsLoading(false); // У будь-якому випадку скидаємо  завантаження
      }
    }
    addImages();
  }, [searchName, currentPage]);

 // Метод завантаження додаткових зображень шляхом збільшення номера поточної сторінки
  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  // Метод обробки відправки форми пошуку
  const handleSubmit = query => {
    setSearchName(query); // Встановлюємо введений запит  стану
    setImages([]); // Очищаємо масив із зображеннями
    setCurrentPage(1); //Скидаємо номер поточної сторінки на першу
  };

  return (
    <div>
      <ToastContainer transition={Slide} />
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        <p
          style={{
            padding: 100,
            textAlign: 'center',
            fontSize: 30,
          }}
        >
          Image gallery is empty... 📷
        </p>
      )}
      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== currentPage && !isLoading && (
        <Button onClick={loadMore} /> //Кнопка для завантаження додаткових зображень
      )}
    </div>
  );
};

export default App;