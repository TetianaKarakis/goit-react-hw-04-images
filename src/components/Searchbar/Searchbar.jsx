import { useState} from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import {
  SearchForm,
  SearchInput,
  SearchButton,
  SearchSpan,
  SearchLogo,
} from './SearchBar.styled';

const SearchBar =({onSubmit}) => {
  const [searchName, setSearchName] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleChange = event => setInputValue(event.target.value);
  
 const handleSubmit = event => {
  event.preventDefault(); // Запобігаємо стандартній поведінці форми
  setSearchName(inputValue.trim()); //Отримуємо введений пошуковий запит і видаляємо прогалини
  onSubmit(searchName); // Передаємо введений пошуковий запит батьківському компоненту
  event.target.reset(); // Скидаємо значення у полі введення після надсилання форми
};
  

  
    return (
      <header>
        <SearchForm onSubmit={handleSubmit}>
          <a href="/src/components/Searchbar/pixabay-logo.png" target="_blank" rel="noreferrer">
            <SearchLogo
              src={require('./pixabay-logo.png')} 
              alt="logo"
              width="200"
            />
          </a>
          <SearchButton>
            <BsSearch />
            <SearchSpan>Search</SearchSpan>
          </SearchButton>
          <SearchInput
            name="searchName"
            type="text"
            id="search"
            value={inputValue}
            onChange={handleChange}
          />
        </SearchForm>
      </header>
    );
  
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;