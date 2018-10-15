import React from 'react'

import Header from './header/Header';
import Footer from './footer/Footer';
import Home from './home/Home';

const App = () => {
    return (
        <div>
            <Header title="calcul-assmat-ihm" />
            <Home />
            <Footer />
        </div>
    );

};

export default App