import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <div id='nav-right'>
        <div>
          <NavLink to="/host-your-spot" className='nav-item' id='host-your-spot'>Host Your Spot</NavLink>
        </div>
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      </div>
      </>
    );
} else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup" className='nav-item'>Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav className='nav-container'>
      <ul>
        <li>
          <NavLink exact to="/" className='nav-item' id='home'>
            <img src='https://ebenezersuites.com/wp-content/uploads/2016/06/airbnb-logo-266x300@2x.png'
            id='home-logo'
            />
            <p id="rairbnb">Rairbnb</p>
          </NavLink>
        </li>
      </ul>
          {isLoaded && sessionLinks}
    </nav>
  );
}

export default Navigation;
