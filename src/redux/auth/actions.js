export const PUT_LOGIN_DATA = "PUT_LOGIN_DATA";
export const REMOVE_LOGIN_DATA = "REMOVE_LOGIN_DATA";

export const putLoginData = (username, token) => {
  return {
    type: PUT_LOGIN_DATA,
    payload: { username, token },
  };
};

export const removeLoginData = () => {
  return {
    type: REMOVE_LOGIN_DATA,
  };
};
