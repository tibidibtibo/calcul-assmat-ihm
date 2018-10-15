import React from "react";

const footerStyle = {
  position: "fixed",
  bottom: "0px",
  width: "100%"
};

const Footer = props => (
  <div style={footerStyle}>
    <nav className="header navbar navbar-dark bg-dark">
      <div className="container">
        <div className="row m-auto">
          <div className="h6 ml-3 my-auto text-light">
            calcul-assmat-ihm - 2018
          </div>
        </div>
      </div>
    </nav>
  </div>
);

export default Footer;
