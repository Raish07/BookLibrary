import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {CartContext} from './context/CartContext';



const Shop = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(false); // Initialize to false
  const [page,setPage] = useState(0)
  
  const handleNextPage =() =>{ 
   
    
    setPage(page+10)
    fetchBooks();
    
  }
  const handlePrevPage =()=>{
    
    setPage(page-10)
    fetchBooks();
    
  }

  const{addToCart } = useContext(CartContext)
  
  
  const handleFilter = (e) => {
    setFilter(e.target.value === 'ebook'); // Toggle filter based on selected option
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  const api_key = 'AIzaSyD_ei1MQB-CP5Xh1TES1b60IJltCNSKXuE';

  const fetchBooks = () => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${search}:keyes&startIndex=${page}&key=${api_key}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.items|| []);
        console.log(data.items);
      })
      .catch((error) => console.log(error));
  };
useEffect  (() =>{
  fetchBooks()
  // eslint-disable-next-line
},[])
  return (
    <>
      <form value={search} onSubmit={handleSubmit}>
      <form>
        <select onChange={handleFilter} className="filter-select">
          <option className = 'select-option'value="">Filter</option>
          <option className = 'select-option'value="All">All</option>
          <option className = 'select-option'value="ebook">E-book</option>
        </select>
      </form>
        <div className="search-input">
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="search"
            placeholder="Search your Book"
            type="search"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </div>
        
      </form>


      {filter && (
        // Render the filtered books here
        <ul className='book-items'>
          {books
            .filter((book) => book.saleInfo.isEbook)
            .map((book) => (
              <li key={book.id} className='book-list'>
                <h3 className="book-heading">{book.volumeInfo.title}</h3>- <Link className="book-link" to={book.volumeInfo.infoLink}>Check out</Link>
              {book.volumeInfo.description &&  <p className='description'> {book.volumeInfo.description.substring(0,200)}</p>}
                {book.volumeInfo.imageLinks?.thumbnail? (<img className = 'book-image'src={book.volumeInfo.imageLinks.thumbnail} alt='cover'/> ):(
                <p>No image</p>
                )} 
              
          <button className="add-to-cart-btn" onClick={() => addToCart(book)}>Add to cart</button>
               


              </li>
              
            ))}
        </ul>
      )}

      {!filter && (
        
        // Render all books when filter is not activated
        <ul className='book-items'>
          {books.map((book) => (
            <div className='book-list' key={book.id}>
              {book.volumeInfo.imageLinks?.thumbnail? (<img className = 'book-image'src={book.volumeInfo.imageLinks.thumbnail} alt='cover'/> ):(
                <p>No image</p>
                )} 
              <div className='title-desc'>
              <li className='book-title'><h3 className='book-heading'>{book.volumeInfo.title}</h3> - <Link to={book.volumeInfo.infoLink}>Check out</Link></li>
              {book.volumeInfo.description &&  <p className='description'> {book.volumeInfo.description.substring(0,200)}</p>}
              </div>

              
          <button className="add-to-cart-btn" onClick={() => addToCart(book)}>Add to cart</button>

           
          </div>)) 
          }
        </ul>
      )}
      <div className='page-button'>
      <button className="page-btn" onClick={handleNextPage}> Next</button>
      <button className="page-btn"onClick={handlePrevPage}> Previous</button>
      </div>
    </>
  );
};

export default Shop;