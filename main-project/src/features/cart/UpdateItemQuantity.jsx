import { useDispatch } from 'react-redux';

import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';
import { useDarkContext } from '../../App';
import { useEffect, useState } from 'react';

function UpdateItemQuantity({ productId, currentQuantity ,countInStock}) {
  const [disabled,setDisabled]=useState(false)
  const dispatch = useDispatch();
  const { isDark} = useDarkContext();

  useEffect(()=>{
    if (countInStock===currentQuantity) {
      setDisabled(true)
    }
  },[countInStock,currentQuantity])
  return (
    <div className="flex items-center gap-2 md:gap-3 ">
      <button
        type="round"
        className={`btn rounded-full w-8 h-12 ${isDark?'':'bg-gray-400 text-gray-800  hover:bg-gray-500 border-none'} text-xl`}
        onClick={() => dispatch(decreaseItemQuantity(productId))}
      >
        -
      </button>
      <span className={`text-sm font-medium ${isDark?'':'text-gray-800'}`}>{currentQuantity}</span>
      <button
        disabled ={disabled}
        type="round"
        className={`btn rounded-full w-8 h-12 ${isDark?'':'bg-gray-400 text-gray-800 hover:bg-gray-500 border-none'} text-xl`}
        onClick={() => dispatch(increaseItemQuantity(productId))}
      >
        +
      </button>
    </div>
  );
}

export default UpdateItemQuantity;
