import React from "react";
import Header from "../components/header";
import FypGrid from "../components/fypGrid";
import data from "../data";

export default function Fyp() {
  const fyp = data.map((item) => {
    return (
      <div className="gridItem">
        <FypGrid id={item.id} {...item} />
      </div>
    );
  });
  return (
    <>
      <Header show="fyp" />
      <h2>Discover For You</h2>
      <div className="fyp">
        <div className="fypCont">{fyp}</div>
      </div>
    </>
  );
}
