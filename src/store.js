import { createStore } from 'redux'
import { useState } from 'react'

const SET = 'set'
const SET_SEARCH = 'set_search'
const SET_EMPLOYEE = 'set_search'
const SET_ORGANIZATION = 'set_search'
const SET_ADDRESS = 'set_search'

const initialState = {
  sidebarShow: false,
  sidebarUnfoldable: true,
  search: '',
  employee: '',
  organization: '',
  address: '',
}

export function setSearchFilter(data) {
  return {
    type: SET_SEARCH,
    payload: data,
    info: 'Задать значение фильтра поиска',
  }
}

export function setEmployeeFilter(data) {
  return {
    type: SET_EMPLOYEE,
    payload: data,
    info: 'Задать значение фильтра сотрудника',
  }
}

export function setOrganizationFilter(data) {
  return {
    type: SET_ORGANIZATION,
    payload: data,
    info: 'Задать значение фильтра организации',
  }
}

export function setAddressFilter(data) {
  return {
    type: SET_ADDRESS,
    payload: data,
    info: 'Задать значение фильтра адреса',
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
    case SET_SEARCH:
      return { ...state, search: action.payload }
    default:
      return state
  }
}

const store = createStore(
  changeStateReducer,
  /* preloadedState, */ +window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
)
export default store
