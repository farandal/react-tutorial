import { itemsConstants as C } from '../constants';

const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case C.ADD_ITEM:
      if (state.find(item => item === action.item)) {
        return state;
      } else {
        return [action.item, ...state];
      }
    case C.DELETE_ITEM:
      return state.filter(item => item !== action.item);
    default:
      return state;
  }
};

export default itemsReducer;
