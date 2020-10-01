import { combineReducers } from 'redux'
import contacts from './contacts'
import auth from './auth'
import alert from './alert'

export default combineReducers({ contacts, auth, alert })