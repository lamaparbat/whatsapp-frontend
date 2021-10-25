import { createStore } from 'redux';
import updateSelectedChatComponent from './redux/reducers/SendSelectedChat';

const store = createStore(updateSelectedChatComponent,
 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;