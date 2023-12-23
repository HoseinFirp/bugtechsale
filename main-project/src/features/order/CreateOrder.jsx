
import {
  Form,
  Link,
  redirect,
  useActionData,

} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
// import Button from '../../ui/Button';
import EmptyCart from "../cart/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "../cart/cartSlice";
import store from "../../store";
// import { formatCurrency } from "../../utils/helpers";
import {

  updateAddress,
  updateCity,
  updatePhoneNumber,
  updatePostalCode,
} from "../user/userSlice";
import { useDarkContext } from "../../App";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const { isDark } = useDarkContext();
  const dispatch = useDispatch();
  const {
    status: addressStatus,
    address,
    city,
    postalCode,
    phoneNumber,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === "loading";

  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();

  const cart = useSelector(getCart);

  if (!cart.length) return <EmptyCart />;

  function onChange1(e) {
    e.preventDefault();
    dispatch(updateCity(e.target.value));
  }
  function onChange2(e) {
    e.preventDefault();
    dispatch(updatePhoneNumber(e.target.value));
  }
  function onChange3(e) {
    e.preventDefault();
    dispatch(updatePostalCode(e.target.value));
  }
  function onChange4(e) {
    e.preventDefault();
    dispatch(updateAddress(e.target.value));
  }

  return (
    <div className={`px-4 py-6 h-screen ${isDark ? "" : "bg-gray-200"} flex flex-col gap-5 items-center `}>
      <h2
        className={`mb-8 text-xl font-semibold ${
          isDark ? "" : "text-gray-900"
        }`}
      >
        Complete Your Form
      </h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className={`sm:basis-40  ${isDark ? "" : "text-gray-900"}`}>
            City
          </label>
          <input
            className={`input  w-25 border-fuchsia-900 ${
              isDark ? "" : "bg-gray-300 text-gray-700"
            }`}
            type="text"
            name="customer"
            defaultValue={city}
            required
            onChange={(e) => {
              onChange1(e);
            }}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className={`sm:basis-40 ${isDark ? "" : "text-gray-900"}`}>
            Phone number
          </label>
          <div className="grow">
            <input
              className={`input grow  border-fuchsia-900 ${
                isDark ? "" : "bg-gray-300 text-gray-700"
              }`}
              type="tel"
              name="phone"
              defaultValue={phoneNumber}
              required
              onChange={(e) => {
                onChange2(e);
              }}
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className={`sm:basis-40 ${isDark ? "" : "text-gray-900"}`}>
            Postal Code
          </label>
          <div className="grow">
            <input
              className={`input grow  border-fuchsia-900 ${
                isDark ? "" : "bg-gray-300 text-gray-700"
              }`}
              type="number"
              name="postalcode"
              defaultValue={postalCode}
              required
              onChange={(e) => {
                onChange3(e);
              }}
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className={`sm:basis-40 ${isDark ? "" : "text-gray-900"}`}>
            Address
          </label>
          <div className="grow">
            <input
              className={`input grow  border-fuchsia-900 ${
                isDark ? "" : "bg-gray-300 text-gray-700"
              }`}
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
              onChange={(e) => {
                onChange4(e);
              }}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />

          
            <button
              disabled={ (!address || !city || !phoneNumber || !postalCode )?true:false }
              type="submit"
              className={`${
                !address || !city || !phoneNumber || !postalCode
                  ? "bg-gray-600 cursor-default"
                  : "bg-green-600 hover:bg-green-800"
              } btn pt-2 pb-2 pr-3 pl-3 border text-gray-200 rounded-xl  border-none`}
            ><Link to={`${!address || !city || !phoneNumber || !postalCode?'':'/checkout'}`}>
              Next
          </Link>
            </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect
  const newOrder = await createOrder(order);

  // Do NOT overuse
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
