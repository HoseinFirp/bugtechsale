import { useDispatch } from 'react-redux';

import { deleteItem } from './cartSlice';

function DeleteItem({productId}) {
  const dispatch = useDispatch();
  return (
    <button className='btn btn-secondary bg-red-600 hover:bg-red-800 border-none' type="small" onClick={() => dispatch(deleteItem(productId))}>
      Delete
    </button>
  );
}

export default DeleteItem;
