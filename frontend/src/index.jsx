import React from 'react';
import {createRoot} from 'react-dom/client'
import App from './app';
import './index.scss';
import { TodoProvider } from './components/context'
const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
    <React.StrictMode>
        <TodoProvider>
            <App/>
        </TodoProvider>
    </React.StrictMode>
)
