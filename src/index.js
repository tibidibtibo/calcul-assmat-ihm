import React from "react";
import ReactDOM from "react-dom";
import style from "./style.css"

const Index = () => {
  return <div className={style.titre}>Hello React!</div>;
};

ReactDOM.render(<Index />, document.getElementById("index"));