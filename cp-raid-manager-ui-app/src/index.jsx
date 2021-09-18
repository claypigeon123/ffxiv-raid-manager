import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as AlertProvider, transitions, positions } from 'react-alert';

import { App } from './App';
import { configureStore } from './redux/util/ConfigureStore';
import { InfoIcon, SuccessIcon, ErrorIcon, CloseIcon } from './assets/img/Icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toggle/style.css';
import './assets/css/global.css';

const store = configureStore();

const alertOptions = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER,
    transition: transitions.SCALE
};

const alertStyle = {
    backgroundColor: '#151515',
    color: 'white',
    padding: '18px 10px 18px 10px',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '2px 2px 5px 3px rgba(0, 0, 0, 0.4)',
    width: '400px',
    boxSizing: 'border-box'
};

const buttonStyle = {
    borer: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#FFFFFF'
};

const template = ({ style, options, message, close }) => (
    <div style={{ ...alertStyle, ...style }}>
        {options.type === 'info' && <InfoIcon />}
        {options.type === 'success' && <SuccessIcon />}
        {options.type === 'error' && <ErrorIcon />}
        <span style={{ flex: 2, fontSize: 18 }}>{message}</span>
        <button onClick={close} style={buttonStyle} ><CloseIcon /></button>
    </div>
);

const AppContainer = () => (
    <ReduxProvider store={store}>
        <AlertProvider template={template} {...alertOptions} >
            <StrictMode>
                <App />
            </StrictMode>
        </AlertProvider>
    </ReduxProvider>
    
);

render(
    <AppContainer />,
    document.getElementById('root')
);
