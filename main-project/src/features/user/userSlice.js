import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
// import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function getAddress({ latitude, longitude }) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in.
    // Payload of the FULFILLED state
    return { position, address };
  }
);

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
  token: "",
  data: "",
  city: "",
  phoneNumber: "",
  postalCode: "",
  firstname: "",
  lastname: "",
  gender: "",
  age: "",
  profile: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
    updateToken(state, action) {
      state.token = action.payload;
    },
    updateData(state, action) {
      state.data = action.payload;
    },
    updateAddress(state, action) {
      state.address = action.payload;
    },
    updateCity(state, action) {
      state.city = action.payload;
    },
    updatePhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    updatePostalCode(state, action) {
      state.postalCode = action.payload;
    },
    updateFirstname(state, action) {
      state.firstname = action.payload;
    },
    updateLastname(state, action) {
      state.lastname = action.payload;
    },
    updateGender(state, action) {
      state.gender = action.payload;
    },
    updateAge(state, action) {
      state.age = action.payload;
    },
    updateProfile(state, action) {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error =
          "There was a problem getting your address. Make sure to fill this field!";
      }),
});

export const {
  updateName,
  updateToken,
  updateData,
  updateAddress,
  updateCity,
  updatePhoneNumber,
  updatePostalCode,
  updateFirstname,
  updateLastname,
  updateGender,
  updateAge,
  updateProfile,
} = userSlice.actions;

export const useUser = () => useSelector((state) => state.user);

export default userSlice.reducer;
