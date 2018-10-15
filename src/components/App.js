import React from "react";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main/Main";

const App = () => {
  return (
    <div>
        <Header title="Déclaration mensuelle d'Assistante Maternelle" />
        <Main />
        <Footer />
    </div>
    );
};

export default App;
