
function CartPage(){

  return (
    <>
      <div>
        <div>
          <img />
          <p></p> <p></p>{" "}
          <div className="card-actions flex items-center gap-3 ">
            <button className="border w-8 h-8 rounded-full bg-cyan-800">
              -
            </button>
            <p className="text-xl">0</p>
            <button className="border w-8 h-8 rounded-full   bg-cyan-800">
              +
            </button>
          </div>
        </div>
      </div>
      <div className=" items-center flex">
        <p className="justify-self-start">Total Price</p>{" "}
        <button className="justify-self-end">Next</button>
      </div>
    </>
  );
}

export default CartPage;
