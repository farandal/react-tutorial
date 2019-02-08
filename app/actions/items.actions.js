import { itemsConstants as C } from '../constants';

function createItem(item) {
  return { type: C.ADD_ITEM, item: item.toString() };
}

function deleteItem(item) {
  return { type: C.DELETE_ITEM, item: item.toString() };
}

export const itemsActions = {
  createItem,
  deleteItem
};
