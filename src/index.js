import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from './App';
import {Provider as AuthProvider} from '../src/context/AuthContext';
import {Provider as LockerProvider} from '../src/context/LockerContext';
import {Provider as LocationProvider} from '../src/context/LocationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <LocationProvider>
    <LockerProvider>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </LockerProvider>
    </LocationProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
