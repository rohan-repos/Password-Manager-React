import React from 'react';
import Header from './header/Header';
import Display from './display/Display';

const Main = () => {
  const contStyle={
    display:"flex",
    // alignItems:"center",
    justifyContent:"center",
    minHeight:"100vh"
  }

    return (
        <div style={contStyle}>
          <div>
            <Header />
            <Display />
            </div>
        </div>
    )
}

export default Main;