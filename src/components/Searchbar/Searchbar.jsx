import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchItem: '',
  };

  handleChange = e => {
    this.setState({ searchItem: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { searchItem } = this.state;
    if (this.state.searchItem.trim() === '') {
      alert('Please, enter a search word!');
      return;
    }
    this.props.onSubmit(searchItem);
    this.setState({ searchItem: '' });
  };

  render() {
    const { searchItem } = this.state;
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.form}>
          <button type="submit" className={css.button}>
            <span className="button-label">Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={searchItem}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
