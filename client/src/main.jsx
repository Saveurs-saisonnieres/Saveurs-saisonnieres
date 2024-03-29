import ReactDOM from 'react-dom';
import App from './App.jsx';
import store from './stores/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
