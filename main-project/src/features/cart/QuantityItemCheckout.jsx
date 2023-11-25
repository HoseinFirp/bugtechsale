
import { useDarkContext } from '../../App';

function QuantityItemCheckout({  currentQuantity }) {

  const { isDark} = useDarkContext();
  return (
    <div className="flex items-center gap-2 md:gap-3 ">
      
      <span className={`text-sm font-medium ${isDark?'':'text-gray-800'}`}>{currentQuantity}</span>
      
    </div>
  );
}

export default QuantityItemCheckout;
