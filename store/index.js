import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

let store

const initialState = {
  step: 1,
  businessType: null,
  businessSize: null,
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
  companyName: '',
  firstName: '',
  lastName: '',
  email: '',
  signUpPassword: '',
  signUpPasswordConfirm: '',
  popUpMessage: '',
  popUpActive: false,
  popUpStyle: 'error',
  loginData: {},
  isAdmin: false,
  sideBarToggle: true,
  activeAppPage: 'Overview',
  newShiftEmployeeAmount: 0,
  newShiftStartTime: '',
  newShiftEndTime: '',
  newShiftTitle: '',
  shifts: [],
  shiftModalOpen: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_STEP':
      return {
        ...state,
        step: state.step + 1,
      }
    case 'DECREMENT_STEP':
      return {
        ...state,
        step: state.step - 1,
      }
    case 'SET_BUSINESS_TYPE':
      return {
        ...state,
        businessType: action.payload,
      }
    case 'SET_BUSINESS_SIZE':
      return {
        ...state,
        businessSize: action.payload
      }
    case 'SET_MONDAY':
      return {
        ...state,
        monday: action.payload
      }
    case 'SET_TUESDAY':
      return {
        ...state,
        tuesday: action.payload
      }
    case 'SET_WEDNESDAY':
      return {
        ...state,
        wednesday: action.payload
      }
    case 'SET_THURSDAY':
      return {
        ...state,
        thursday: action.payload
      }
    case 'SET_FRIDAY':
      return {
        ...state,
        friday: action.payload
      }
    case 'SET_SATURDAY':
      return {
        ...state,
        saturday: action.payload
      }
    case 'SET_SUNDAY':
      return {
        ...state,
        sunday: action.payload
      }
    case 'SET_COMPANY_NAME':
      return {
        ...state,
        companyName: action.payload
      }
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload
      }
    case 'SIGN_UP_PASSWORD':
      return {
        ...state,
        signUpPassword: action.payload
      }
    case 'SIGN_UP_PASSWORD_CONFIRM':
      return {
        ...state,
        signUpPasswordConfirm: action.payload
      }
    case 'SET_POP_UP_ERROR':
      return {
        ...state,
        popUpMessage: action.payload,
        popUpActive: true,
        popUpStyle: 'error'
      }
    case 'SET_POP_UP':
      return {
        ...state,
        popUpMessage: action.payload,
        popUpActive: true,
        popUpStyle: 'succes'
      }
    case 'CLEAR_POP_UP':
      return {
        ...state,
        popUpActive: false
      }
    case 'SET_FIRST_NAME':
      return {
        ...state,
        firstName: action.payload
      }
    case 'SET_LAST_NAME':
      return {
        ...state,
        lastName: action.payload
      }
    case 'SET_LOGIN_DATA':
      return {
        ...state,
        loginData: action.payload.company,
        isAdmin: action.payload.isAdmin
      }
    case 'SET_SIDEBAR_TOGGLE':
      return {
        ...state,
        sideBarToggle: action.payload
      }
    case 'SET_ACTIVE_APP_PAGE':
      return {
        ...state,
        activeAppPage: action.payload
      }
    case 'SET_SHIFT_TITLE':
      return {
        ...state,
        newShiftTitle: action.payload
      }
    case 'SET_SHIFT_STARTTIME':
      return {
        ...state,
        newShiftStartTime: action.payload
      }
    case 'SET_SHIFT_ENDTIME':
      return {
        ...state,
        newShiftEndTime: action.payload
      }
    case 'SET_SHIFT_EMPLOYEE_AMOUNT':
      return {
        ...state,
        newShiftEmployeeAmount: action.payload
      }
    case 'SET_SHIFTS':
      return {
        ...state,
        shifts: action.payload
      }
    case 'ADD_SHIFT':
      return {
        ...state,
        shifts: [...state.shifts, action.payload]
      }
    case 'SET_SHIFT_MODAL':
      return {
        ...state,
        shiftModalOpen: action.payload
      }
    default:
      return state
  }
}

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}