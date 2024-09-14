import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Product from "./Product";
import { withAuth } from "./withAuth";
import imageman from "../images/photo_2024-05-04_14-32-02.jpg";
import "./Body.css";

function Furniture() {
  const [count, setCount] = useState(1);
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(1);
  const [value, setValue] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [show, setShow] = useState(false);
  const [totalPages, setTotalPages] = useState(1); // Add a state for total pages

  const callApi = async () => {
    try {
      const response = await axios.get(
        `https://mall.ahmadkouja.com/api/category/show?category_id=7&page=${count}`
      );
      setPosts(response.data);
      setTotalPages(response.data.total_pages); // Set total pages
    } catch (error) {
      console.log(error);
    }
  };

  const searchApi = async () => {
    try {
      const response = await axios.post(
        `https://mall.ahmadkouja.com/api/product/search/${discount}`,
        { search: value }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callApi();
  }, [count]);

  useEffect(() => {
    if (discount !== 0 || value !== "") {
      searchApi();
      setIsSearching(true);
    } else {
      setIsSearching(false);
      setSearchResults([]); // Clear search results when search bar is cleared
    }
  }, [discount, value]);

  useEffect(() => {
    if (searchResults.some((post) => post.discount)) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [searchResults]);

  const handleInputChange = (event) => {
    const text = event.target.value;
    setValue(text);
    if (text === "") {
      setIsSearching(false);
      setSearchResults([]); // Clear search results when search bar is cleared
    }
  };

  const handlePageChange = (newPage) => {
    setCount(newPage);
    setIndex(newPage);
  };

  return (
    <div className="body">
      <div className="container-select">
        <div className="input">
          <input
            className="search"
            type="search"
            name=" "
            placeholder=" Search a product, a brand"
            value={value}
            onChange={handleInputChange}
          />
        </div>

        <div className="select">
          <p className="select-p">Discounts</p>
          {show && (
            <button className="remove" onClick={() => setDiscount(1)}>
              Discount
            </button>
          )}
        </div>
      </div>
      <img className="home-image" src={imageman} alt="home" />

      <div className="content">
        {isSearching
          ? searchResults.map((post) => (
              <Product
                id={post.id}
                name={post.name}
                price={post.price}
                image={post.image}
                description={post.description}
                discount={post.discount}
                amount={post.amount}
                size={post.size}
                color={post.color}
              />
            ))
          : posts.map((post) => (
              <Product
                id={post.id}
                name={post.name}
                price={post.price}
                image={post.image}
                description={post.description}
                discount={post.discount}
                amount={post.amount}
                size={post.size}
                color={post.color}
              />
            ))}
      </div>

      <div className="wrapper">
        <FaAngleLeft
          className="icon"
          onClick={() => handlePageChange(index - 1 < 1 ? 1 : index - 1)}
        />

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <ul>
              <li
                className={pageNumber === index ? "active" : ""}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </li>
            </ul>
          )
        )}

        <FaAngleRight
          className="icon"
          onClick={() =>
            handlePageChange(index + 1 > totalPages ? totalPages : index + 1)
          }
        />
      </div>
    </div>
  );
}
export default withAuth(Furniture);
