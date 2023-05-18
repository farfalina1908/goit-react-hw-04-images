import React, { Component } from 'react';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import { searchImages } from './servises/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import css from './App.module.css';

class App extends Component {
  state = {
    searchWord: '',
    page: 1,
    pics: [],
    isLoading: false,
    error: null,
    showModal: false,
    bigImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchWord !== prevState.searchWord) {
      this.fetchPics();
    }
  }

  fetchPics = async () => {
    try {
      this.setState({ isLoading: true });
      const { searchWord, page } = this.state;
      const response = await searchImages(searchWord, page);

      if (response.data.hits.length === 0) {
        alert('No results found');
        this.setState({
          isLoading: false,
        });
        return;
      }
      if (page > response.totalHits / 12) {
        alert('The end');
        this.setState({ isLoading: false });
        return;
      }
      this.setState(prevState => ({
        isLoading: false,
        pics: [...prevState.pics, ...response.data.hits],
        page: prevState.page + 1,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  handleSearchFormSubmit = searchItem => {
    this.setState({
      searchWord: searchItem,
      page: 1,
      pics: [],
    });
  };

  openModal = image => {
    this.setState({
      showModal: true,
      bigImage: image,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      bigImage: '',
    });
  };

  render() {
    const { searchWord, page, pics, isLoading, showModal, bigImage } =
      this.state;
    const seekWord = searchWord.toUpperCase();
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        {searchWord && (
          <h2 className={css.seekItem}>SEARCHING FOR: {seekWord}</h2>
        )}
        {<ImageGallery images={pics} onImageClick={this.openModal} />}
       
        {isLoading && <Loader />}
        {page > 1 && <Button onLoadMore={this.fetchPics} />}
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={bigImage} alt={searchWord} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
