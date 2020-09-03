import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import middleware from './middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';
import rootReducer from './reducers';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

const persistConfig = {
  key: 'ruse',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['envOptions', 'draggable', 'notepads', 'notesOptions', 'editEnv', 'initiative', 'userNames']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(middleware));
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <DndProvider backend={HTML5Backend}>
    <App />
    </DndProvider>
    </PersistGate>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
