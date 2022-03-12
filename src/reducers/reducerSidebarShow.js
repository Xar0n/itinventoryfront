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

export default changeState
