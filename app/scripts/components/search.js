import React, { useState } from "react";
import SearchList from "./searchlist";
import useFetch from "./useFetch";
import { useDispatch, useSelector } from "react-redux";
import { setInputVal, setSearchShow } from "../features/searchInputSlice";
import { async } from "regenerator-runtime";
import axios from "axios";

function Search() {
  const searchField = useSelector((state) => state.inputReset.inputVal);
  const searchShow = useSelector((state) => state.inputReset.searchShow);
  const dispatch = useDispatch();

  const [filteredProducts, setFilteredProducts] = useState([]);

  // fetching section was added here
  // const { data, loading, error } = useFetch("http://localhost:3035");
  // if (loading) {
  //   return <p>Is Loading...</p>;
  // }
  // if (error) {
  //   return <p>{error}</p>;
  // }
  // if (!data) {
  //   return null;
  // }

  // const filteredProducts = data.filter((product) => {
  //   if (product.isActive === "true") {
  //     return product.name.toLowerCase().includes(searchField.toLowerCase());
  //   }
  // });

  const handleChange = async (e) => {
    e.preventDefault();
    dispatch(setInputVal(e.target.value));
    if (e.target.value === "" || e.target.value === " ") {
      dispatch(setSearchShow(false));
    } else {
      dispatch(setSearchShow(true));
      try {
        const res = await axios.get(
          `http://localhost:3035/?filter=${e.target.value}`
        );
        console.log("Response: ", res);
        setFilteredProducts(res.data.data);
        console.log("filteredProducts: ", filteredProducts);
      } catch (error) {
        console.error("POST error!", error);
      }
    }
  };

  function searchList() {
    if (searchShow) {
      console.log("Function SearchList filteredProducts: ", filteredProducts);
      return <SearchList filteredProducts={filteredProducts} />;
    }
  }

  return (
    <section>
      <div>
        <input
          className="input"
          type="search"
          value={searchField}
          placeholder="Search..."
          onChange={handleChange}
        />
      </div>
      {searchList()}
    </section>
  );
}

export default Search;
