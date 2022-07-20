import React from "react";
import Card from "./card";

function SearchList({ filteredProducts }) {
  const filtered = filteredProducts.map((product) => (
    <Card key={product._id} product={product} />
  ));
  console.log("filtered", filtered);

  return (
    <div>
      <p className="searchlist-found">
        Found {filtered.length} fantastic products:{" "}
      </p>
      <div className="filtered">{filtered}</div>
    </div>
  );
}

export default SearchList;
