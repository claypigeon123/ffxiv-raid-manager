import { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/global.css';

const AppContainer = (
    <StrictMode>
        <App />
    </StrictMode>
);

render(
    <AppContainer />,
    document.getElementById('root')
);
