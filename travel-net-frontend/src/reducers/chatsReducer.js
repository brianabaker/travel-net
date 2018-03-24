
import {FETCHING_CHAT, FETCHED_CHAT, SENT_MESSAGE} from '../actions/chats'

export const chatsState = {
  isLoading: false,
  chatroom: '',
}

function chatsReducer(state = chatsState, action) {
  switch(action.type){
    case FETCHING_CHAT:
      console.log('in the dispatch fetching')
      return {...state, isLoading: true}
    case FETCHED_CHAT:
    console.log('in the dispatch fetched', action.payload)
      return {...state, isLoading: false, chatroom: action.payload}
    case SENT_MESSAGE:
    console.log('sent message', action.payload)
      return {...state, chatroom: action.payload}
    default:
      return state
  }
}

export default chatsReducer
