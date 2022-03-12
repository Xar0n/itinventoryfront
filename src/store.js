import { createStore } from 'redux'
import rootReducer from './reducers/rootReducer'

const SET = 'set'

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: true,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case SET:
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(
  changeState,
  /* preloadedState, */ +window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
)
export default store
