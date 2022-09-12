import { applyMiddleware, compose,legacy_createStore } from 'redux';
import { persistStore } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import RootReducer from './reducers';

const store = legacy_createStore(RootReducer, compose(applyMiddleware(ReduxThunk)));

persistStore(store);

export default store;
