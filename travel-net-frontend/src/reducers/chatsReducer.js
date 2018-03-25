
import {FETCHING_CHAT, FETCHED_CHAT, SENT_MESSAGE} from '../actions/chats'

export const chatsState = {
  isLoading: false,
  chatroom: '',
}

function chatsReducer(state = chatsState, action) {
  switch(action.type){
    case FETCHING_CHAT:
      return {...state, isLoading: true}
    case FETCHED_CHAT:
      return {...state, isLoading: false, chatroom: action.payload}
    case SENT_MESSAGE:
      return {...state, chatroom: action.payload}
    default:
      return state
  }
}

export default chatsReducer
