import React from 'react';

const Header = () => {
  return (
    <header>
        <div class="logo">
            <img src="images/logo2.png" alt="Logo" style={{marginRight: "0.5rem", width:"100px"}} />
        </div>
        <div class="user-info">
            <a href='https://prendia.shop'><img src="images/user.png" alt="User Test" style={{}} /></a>
        </div>
    </header>
  );
};

export default Header;