import { createStore } from 'redux'

const SET = 'set'
const SET_SEARCH = 'set_search'
const SET_EMPLOYEE = 'set_employee'
const SET_ORGANIZATION = 'set_organization'
const SET_ADDRESS = 'set_address'
const SET_STORAGE = 'set_storage'
const RESET_FILTERS = 'reset_filters'

const initialState = {
  sidebarShow: false,
  sidebarUnfoldable: true,
  search: '',
  employee: '',
  organization: '',
  address: '',
  storage: '',
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

export function setStorageFilter(data) {
  return {
    type: SET_STORAGE,
    payload: data,
    info: 'Задать значение фильтра склада/кабинеиа',
  }
}

export function changeState(data) {
  return {
    type: SET,
    payload: data,
  }
}

export function resetFilters() {
  return {
    type: RESET_FILTERS,
  }
}

const changeStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return { ...state, ...action.payload }
    case SET_SEARCH:
      return { ...state, search: action.payload }
    case SET_ORGANIZATION:
      return { ...state, organization: action.payload }
    case SET_EMPLOYEE:
      return { ...state, employee: action.payload }
    case SET_ADDRESS:
      return { ...state, address: action.payload }
    case SET_STORAGE:
      return { ...state, storage: action.payload }
    case RESET_FILTERS:
      return { ...state, search: '', organization: '', employee: '', address: '', storage: '' }
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
