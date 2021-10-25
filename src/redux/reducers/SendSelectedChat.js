const initialState = {}
export default function updateSelectedChatComponent(state = initialState, action) {
 switch (action.type) {
  case "selectedChat":
     return {
       state: action.payload
     }
  default:
     return {
       state: action.payload
     }
 }
}