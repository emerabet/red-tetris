import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSagaMiddleWare from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './middlewares/sagas';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleWare();

export default () => {
    let store = createStore(persistedReducer,
        compose(applyMiddleware(sagaMiddleware))
    );
    sagaMiddleware.run(rootSaga);
    let persistor = persistStore(store);
    return { store, persistor };
}

