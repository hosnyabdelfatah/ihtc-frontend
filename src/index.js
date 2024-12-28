import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider,} from 'react-query'
import {Provider} from 'react-redux';
import {store} from './store';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {AuthProvider} from "./context/AuthProvider";
import {AlertProvider} from "./context/AlertProvider";
import {disableReactDevTools} from '@fvilers/disable-react-devtools';
import Alert from "./components/Alert";


if (process.env.NODE_ENV === 'production') disableReactDevTools()
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <AlertProvider>
                    <AuthProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path={"/*"} element={<App/>}/>
                            </Routes>
                            <Alert/>
                        </BrowserRouter>
                    </AuthProvider>
                </AlertProvider>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
