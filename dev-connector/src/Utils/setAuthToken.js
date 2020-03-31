import Axios from "axios";
export const setAuthToken = Token => {
  if (Token) {
    // Apply Token To Every Req You Not Have To Manually Set Authorization Token Set It Will
    // Use Authorization Token As Default Which We Set While We Got Our Token 1st Time-
    // So It Reduces A Little Bit Work
    Axios.defaults.headers.common["Authorization"] = Token;
  } else {
    // Delete Auth Header When We Are No Longer LoggedIn
    delete Axios.defaults.headers.common["Authorization"];
  }
};
