import { createStore } from 'redux'

const SET = 'set'
const SET_SEARCH = 'set_search'
const SET_EMPLOYEE = 'set_employee'
const SET_ORGANIZATION = 'set_organization'
const SET_ADDRESS = 'set_address'
const SET_STORAGE = 'set_storage'
const SET_USER = 'set_user'
const SET_RESULT_INVENTORY = 'set_result_inventory'
const SET_BARCODE_GENERATE = 'set_barcode_generate'
const SET_BARCODE_PRINT = 'set_barcode_print'
const RESET_FILTERS = 'reset_filters'

const initialState = {
  sidebarShow: false,
  sidebarUnfoldable: true,
  search: '',
  employee: '',
  organization: '',
  address: '',
  storage: '',
  user: '',
  result_inventory: [],
  barcode_generate: [],
  barcode_print: [],
}

export function setBarcodeGenerate(data) {
  return {
    type: SET_BARCODE_GENERATE,
    payload: data,
    info: 'Задать значение штрихкодов для формирования',
  }
}

export function setBarcodePrint(data) {
  return {
    type: SET_BARCODE_PRINT,
    payload: data,
    info: 'Задать значение штрихкодов для печати',
  }
}

export function setResultInventory(data) {
  return {
    type: SET_RESULT_INVENTORY,
    payload: data,
    info: 'Задать значение результатов проведенной инвентаризации',
  }
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
    info: 'Задать значение фильтра склада/кабинета',
  }
}

export function setUser(data) {
  return {
    type: SET_USER,
    payload: data,
    info: 'Установить текущего пользователя',
  }
}

export function changeState(data) {
  return {
    type: SET,
    payload: data,
    info: 'Установить состояние боковой панели',
  }
}

export function resetFilters() {
  return {
    type: RESET_FILTERS,
    info: 'Обнулить значения всех фильтров',
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
    case SET_RESULT_INVENTORY:
      return { ...state, result_inventory: action.payload }
    case SET_BARCODE_GENERATE:
      return { ...state, barcode_generate: action.payload }
    case SET_BARCODE_PRINT:
      return { ...state, barcode_print: action.payload }
    case SET_USER:
      return { ...state, user: action.payload }
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
