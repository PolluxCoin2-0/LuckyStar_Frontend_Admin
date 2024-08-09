import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// LOGIN
export const connectWallet = async (walletAddress) => {
  try {
    const res = await axios.post(BASE_URL + "/signIn", {
      adminAddress: walletAddress,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// START BIDDING
export const startBidding = async (token, walletAddress) => {
  try {
    const res = await axios.post(
      BASE_URL + "/startBiddingAdmin",
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
export const submitWinningNumber = async (winningNo, walletAddress, token) => {
  try {
    const res = await axios.post(
      BASE_URL + "/submitWinningNumberAdmin",
      {
        number: winningNo,
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

// STIMULATE WINNING NUMBER
export const stimulateWinningNumber = async (winningNo, token) => {
  try {
    const res = await axios.post(
      BASE_URL + "/simulateWinningNumberAdmin",
      {
        number: winningNo,
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
export const getAllUsers = async (token) => {
  try {
    const res = await axios.get(BASE_URL + "/getAllUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// GET USER BY ID
export const getUserById = async (id, token) => {
  try {
    const res = await axios.get(BASE_URL + `/getUserById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// USER BLOCK AND UNBLOCK
export const getUserBlockAndUnblock = async (id, token) => {
  try {
    const res = await axios.get(BASE_URL + `/blockUnblockUser/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// DELETE THE USER
export const getUserDelete = async (id, token) => {
  try {
    const res = await axios.delete(BASE_URL + `/deleteUser/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// UPDATE USER DETAILS
export const getUserDetailsUpdate = async (token, id, userData) => {
  try {
    const res = await axios.put(
      BASE_URL + `/updateUser/${id}`,
      {
        email: userData?.email,
        referredBy: userData?.referredBy,
        phone: userData?.phone,
        countryCode: userData?.countryCode,
        city: userData?.city,
        state: userData?.state,
        zipCode: userData?.zipCode,
        walletAddress: userData?.walletAddress,
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

// SET MULTIPLIER
export const setMultiplier = async (
  digit,
  multiplier,
  walletAddress,
  token
) => {
  try {
    const res = await axios.post(
      BASE_URL + "/setMultiplierAdmin",
      {
        digits: digit,
        multiplier: multiplier,
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

// CREATE FAQs
export const createFAQ = async (token, formData) => {
  try {
    const res = await axios.post(
      BASE_URL + "/createFaq",
      {
        question: formData?.[0]?.question,
        answer: formData?.[0]?.answer,
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

// GET FAQS LIST
export const getAllFaqList = async (token) => {
  try {
    const res = await axios.get(BASE_URL + "/getAllFaq", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// DELETE FAQ
export const deleteFaq = async (token, id) => {
  try {
    const res = await axios.delete(BASE_URL + `/deleteFaq/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// GET ALL TICKETS
export const getAllTickets = async (token) => {
  try {
    const res = await axios.get(BASE_URL + "/getTickets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// GET TICKETS BY USER ID
export const getTicketDetailsById = async (token, id) => {
  try {
    const res = await axios.get(BASE_URL + `/getTicketsById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// ADD REPLY
export const postAddTicketAnswer = async (token, id, message) => {
  try {
    const res = await axios.post(
      BASE_URL + `/addReply/${id}`,
      {
        message: message,
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

// DELETE TICKET
