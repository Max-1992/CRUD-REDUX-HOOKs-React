// Redux Native
import { combineReducers } from 'redux';

// Import Reducers
import productsReducer from './productsReducer';
import alertReducer from './alertReducer';

export default combineReducers({
    products: productsReducer,
    alert: alertReducer
})