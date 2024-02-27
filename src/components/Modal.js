import React from 'react';
import Auth from './Auth';
import { Context } from "../context/AuthContext";
import './Modal.css';

const Modal = ({ showModal, setShowModal }) => {

  const handleLogin = () => {
    // Handle login logic
    console.log('Logging in...');
  };

  const handleRegister = () => {
    // Handle register logic
    console.log('Registering...');
  };

  return (
    <div> {showModal &&
      <div className="modal">
        <div className="">
          <span className="btnClose" onClick={() => setShowModal(false)}>&times;</span>
          <h2 className='modalH2'>Login / Register</h2>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" />
          </div>
          <div className="button-group">
            {/* <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button> */}
            <button>
              test
            </button>
          </div>
        </div>
      </div>
    }
    </div>
  )
};

export default Modal;
