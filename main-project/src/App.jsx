import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import { Navbar } from "./pages/Navbar";
import { Settings } from "./pages/settings";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ProductById from "./Products/ProductById";
import Cart from "./features/cart/Cart";
import Signup from "./pages/Signup";
import AboutUs from "./pages/AboutUs";
import { createContext, useContext, useEffect, useState } from "react";
import Checkout from "./pages/Checkout";
import Changeprofile from "./pages/Changeprofile";
import SettingSidebar from "./pages/SettingSidebar";
import ChangePassword from "./pages/ChangePassword";
import ChangeAvatar from "./pages/ChangeAvatar";
import { updateData, useUser } from "./features/user/userSlice";
import axios from "axios";
import Submit from "./pages/Submit";
import GetAllOrders from "./pages/GetAllOrders";
import GetOneOrder from "./pages/GetOneOrder";
import { dispatch } from "./store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function AppLayOut() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

function SettingLayOut() {
  return (
    <div className="flex ">
      <SettingSidebar />
    </div>
  );
}

const DarkContext = createContext({});
export const useDarkContext = () => useContext(DarkContext);

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const user = useUser();
  useEffect(() => {
    if (user.token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user.token]);

  const router = createBrowserRouter([
    {
      element: <AppLayOut />,
      errorElement: <PageNotFound />,

      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/aboutus",
          element:  <AboutUs /> ,

          errorElement: <PageNotFound />,
        },
        {
          path: "/submit",
          element: <Submit />,

          errorElement: <PageNotFound />,
        },
        {
          path: `/orders/:cart_id`,
          element: isLogin ? <GetOneOrder /> : <PageNotFound />,

          errorElement: <PageNotFound />,
        },
        {
          path: "/orders/:cart_id",
          element: isLogin ? <GetAllOrders /> : <PageNotFound />,

          errorElement: <PageNotFound />,
        },
        {
          path: "/orders",
          element: isLogin ? <GetAllOrders /> : <PageNotFound />,

          errorElement: <PageNotFound />,
        },
        {
          path: "/profile",
          element: isLogin ? <Profile /> : <PageNotFound />,

          errorElement: <PageNotFound />,
        },
        {
          element: <ProductById />,

          errorElement: <PageNotFound />,
        },
        {
          path: "/signup",
          element: !isLogin ? <Signup /> : <PageNotFound />,
          errorElement: <PageNotFound />,
        },
        {
          path: "/login",
          element: !isLogin ? <Login /> : <PageNotFound />,
          errorElement: <PageNotFound />,
        },

        {
          path: "cart",
          element: <Cart />,

          errorElement: <PageNotFound />,
        },
        {
          path: "/address",
          element: isLogin ? <CreateOrder /> : <PageNotFound />,
          action: createOrderAction,
          errorElement: <PageNotFound />,
        },
        // {
        //   path: "list/orders",
        //   element: <Order />,

        //   errorElement: <PageNotFound />,
        // },

        {
          path: "checkout",
          element: isLogin ? <Checkout /> : <PageNotFound />,

          errorElement: <PageNotFound />,
        },
        {
          element: <SettingLayOut />,
          errorElement: <PageNotFound />,

          children: [
            {
              path: "settings",
              element: isLogin ? <Settings /> : <PageNotFound />,
              errorElement: <PageNotFound />,
            },
            {
              path: "settings/changeprofile",
              element: isLogin ? <Changeprofile /> : <PageNotFound />,
              errorElement: <PageNotFound />,
            },
            {
              path: "settings/changepassword",
              element: isLogin ? <ChangePassword /> : <PageNotFound />,

              errorElement: <PageNotFound />,
            },
            {
              path: "settings/changeavatar",
              element: isLogin ? <ChangeAvatar /> : <PageNotFound />,

              errorElement: <PageNotFound />,
            },
          ],
        },
      ],
    },
  ]);
  const [isDark, setIsDark] = useState(true);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const req = async () => {
      try {
        const data = await axios.get("http://kzico.runflare.run/user/profile", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        dispatch(updateData(data.data.user));
      } catch (error) {
        console.log(error.response.data);
      }
    };
    req();
  }, [user.token]);

  return (
    <DarkContext.Provider value={{ isDark, setIsDark, setRender, render }}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
          {/* <BrowserRouter>
            <Routes>
              <Route element={<AppLayOut />}>
                <Route index element={<Home />} />
                <Route path="profile" element={<Profile />} />
                <Route element={<SettingLayOut />}>
                  <Route path="settings" element={<Settings />} />
                  <Route
                    path="settings/changeprofile"
                    element={<Changeprofile />}
                  />
                  <Route
                    path="settings/changepassword"
                    element={<ChangePassword />}
                  />
                  <Route
                    path="settings/changeavatar"
                    element={<ChangeAvatar />}
                  />
                </Route>
                <Route path="cart" element={<Cart />} />
                <Route path="list/orders" element={<Order />} />
                <Route path="aboutus" element={<AboutUs />} />
                <Route path="getpro" element={<GetProfile />} />
                <Route path="address" element={<CreateOrder />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter> */}
        </RouterProvider>
      </QueryClientProvider>
    </DarkContext.Provider>
  );
}

export default App;
