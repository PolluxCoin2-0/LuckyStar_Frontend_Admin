import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// SIGNUP
export const postSignup = async (formData) => {
  try {
    const res = await axios.post(BASE_URL + "/signup", {
      email: formData.email,
      referredBy: formData.referral,
      phone: formData.phone,
      countryCode: formData.countryCode,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      walletAddress: formData.walletAddress,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// VERIFY OTP
export const verifyOtp = async (email, otp) => {
  try {
    const res = await axios.post(BASE_URL + "/VerifyOtp", {
      email: email,
      otp: otp,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// LOGIN
export const connectWallet = async (walletAddress) => {
  try {
    const res = await axios.post(BASE_URL + "/login", {
      walletAddress: walletAddress,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//  SIGNOUT
export const signout = async (token) => {
  try {
    const res = await axios.get(BASE_URL + "/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// START BIDDING
export const startBidding = async (token) => {
  try {
    const res = await axios.post(BASE_URL + "/startBiddingAdmin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// END BIDDING
export const endBidding = async (walletAddress, token) => {
  try {
    const res = await axios.post(
      BASE_URL + "/endBiddingAdmin",
      {
        walletAddress: walletAddress,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// SUMBIT WINNING NUMBER
export const submitWinningNumber = async(winningNo, walletAddress)=>{
  try {
    const res = await axios.post(BASE_URL + "/submitWinningNumberAdmin",{
       "number": winningNo,
    "walletAddress": walletAddress
    })
    return res?.data;
  } catch (error) {
    console.log(error);
  }
}

// STIMULATE WINNING NUMBER
export const stimulateWinningNumber = async(winningNo, token)=>{
  try {
    const res = await axios.post(BASE_URL + "/simulateWinningNumberAdmin",{
       "number": winningNo,
    },{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res?.data;
  } catch (error) {
    console.log(error);
  }
}

// GET APPROVAL
export const getApproval = async (walletAddress, amount) => {
  try {
    const res = await axios.post(BASE_URL + "/approvalUSDX", {
      walletAddress: walletAddress,
      amount: amount,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// GET ALL USERS
export const getAllUsers = async (token)=>{
  try {
    const res = await axios.get(BASE_URL + "/getAllUser",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res?.data;
  } catch (error) {
    console.log(error);
  }
}

// GET USER BY ID
export const getUserById = async(id, token)=>{
  try {
    const res = await axios.get(BASE_URL + `/getUserById/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res?.data;
  } catch (error) {
    console.log(error)
  }
}

// USER BLOCK AND UNBLOCK
export const getUserBlockAndUnblock = async(id, token)=>{
  try {
    const res = await axios.get(BASE_URL + `/blockUnblockUser/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res?.data;
  } catch (error) {
    console.log(error)
  }
}

// DELETE THE USER
export const getUserDelete = async(id, token)=>{
  try {
    const res = await axios.delete(BASE_URL + `/deleteUser/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res?.data;
  } catch (error) {
    console.log(error)
  }
}

// UPDATE USER DETAILS
export const getUserDetailsUpdate= async(token)=>{
  try {
    const res = await axios.put(BASE_URL + "/updateUser",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res?.data;
  } catch (error) {
    console.log(error)
  }
}