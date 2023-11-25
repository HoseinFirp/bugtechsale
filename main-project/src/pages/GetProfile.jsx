import axios from "axios";
import { updateData, updateToken, useUser } from "../features/user/userSlice";

import { useDispatch } from "react-redux";

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjbGFldmF6ZXRjamprcnpjenBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMyOTIzNDQsImV4cCI6MTk5ODg2ODM0NH0.LGg0M-taoHgKtxCzr9owrb09epnPaO_Yfz6xVE54sIY
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFqaWRAeWFob28uY29tIiwiaWF0IjoxNjk5NjM1NzI0LCJleHAiOjE3MDAyNDA1MjR9.MbetyRVHGMxik1jgxTlU4_sAZmg_Jz901GrnienI63g

function GetProfile() {
  const dispatch = useDispatch();

  function ResetHandler() {
    dispatch(updateToken(""));
    console.log("is reset")
  }
  const user = useUser();
  const req = async () => {
    try {
      const data = await axios.get("http://kzico.runflare.run/user/profile", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log("profile data is :", data.data.user);
      dispatch(updateData(data.data.user));
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div>
      <button onClick={req}>Get Profile</button>
      <button onClick={ResetHandler}>Reset pro</button>
    </div>
  );
}

export default GetProfile;
