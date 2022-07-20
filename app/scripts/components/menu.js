/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */
import React, { useState } from "react";
import Search from "./search";
import { useDispatch, useSelector } from "react-redux";
import { setInputVal, setSearchShow } from "../features/searchInputSlice";

function Menu() {
  const [showingSearch, setShowingSearch] = useState(false);
  // I removed fetching section here

  const showSearchContainer = (e) => {
    e.preventDefault();
    setShowingSearch(!showingSearch);
  };

  const searchShow = useSelector((state) => state.inputReset.searchShow);
  const dispatch = useDispatch();

  return (
    <header className="menu">
      <div className="menu-container">
        <div className="menu-holder">
          <h1>Mags</h1>
          <nav>
            <a href="#" className="nav-item">
              HOLIDAY
            </a>
            <a href="#" className="nav-item">
              WHAT'S NEW
            </a>
            <a href="#" className="nav-item">
              PRODUCTS
            </a>
            <a href="#" className="nav-item">
              BESTSELLERS
            </a>
            <a href="#" className="nav-item">
              GOODBYES
            </a>
            <a href="#" className="nav-item">
              STORES
            </a>
            <a href="#" className="nav-item">
              INSPIRATION
            </a>
            <a
              href="#"
              onClick={(e) => {
                showSearchContainer(e);
                if (searchShow) {
                  dispatch(setSearchShow(false));
                  dispatch(setInputVal(""));
                }
              }}
            >
              <i className="material-icons search">search</i>
            </a>
          </nav>
        </div>
      </div>

      <div className={(showingSearch ? "showing " : "") + "search-container"}>
        {/* Original <Search items={data} />   ----->   <Search /> */}
        <Search />
        <a
          href="#"
          onClick={(e) => {
            showSearchContainer(e);
            dispatch(setInputVal(""));
            dispatch(setSearchShow(false));
          }}
        >
          <i className="material-icons close">close</i>
        </a>
      </div>
    </header>
  );
}

export default Menu;
