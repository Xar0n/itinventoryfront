import { createStore } from 'redux'
import { combineReducers } from 'redux'
import reducerSidebarShow from './reducers/reducerSidebarShow'
import { useState } from 'react'

const SET = 'set'
const SET_SEARCH = 'set_search'

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: true,
}

const initialEquipmentFilters = {
  search: '',
  employee_id: '',
}

export function setSearchFilter(data) {
  return {
    type: SET_SEARCH,
    payload: data,
    info: 'Задать значение фильтра поиска',
  }
}

export function changeState(data) {
  return {
    type: SET,
    payload: data,
  }
}

const changeStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

const equipmentFiltersReducer = (state = initialEquipmentFilters, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return { ...state, search: action.payload }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  state: changeStateReducer,
  equipment_filters: equipmentFiltersReducer,
})

const store = createStore(
  rootReducer,
  /* preloadedState, */ +window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
)
export default store
