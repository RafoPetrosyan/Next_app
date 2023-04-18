import React from 'react';
import Header from "./Header";
import Footer from "./Footer";

const Wrapper = ({children}) => {
    return (
        <div className='wrapper'>
            <div className="container">
                <Header/>
                {children}
                <Footer/>
            </div>
        </div>
    );
};


export default Wrapper;
