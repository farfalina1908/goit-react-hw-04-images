import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [searchItem, setSearchItem] = useState('');

  const handleChange = e => {
    setSearchItem(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchItem.trim() === '') {
      alert('Please, enter a search word!');
      return;
    }
    onSubmit(searchItem);
    setSearchItem('');
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <span className="button-label">Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={searchItem}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
