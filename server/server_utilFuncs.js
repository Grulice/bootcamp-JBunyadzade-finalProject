const bcrypt = require("bcrypt");
const dbFuncs = require("./server_dbFuncs");

function getRandString(length) {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  let result = "";
  for (let i = 0; i < length; i++) {
    const randIndex = Math.trunc(Math.random() * chars.length);
    result += chars[randIndex];
  }
  return result;
}

function isRequestQueryValid(query) {
  // request for coins is valid if it doesn't have query params or
  // it has query params and they have both count and offset among them
  const isValid = parseInt(query.count) >= 1 && parseInt(query.offset) >= 0;
  return isValid;
}

function createNewUserEntry(newUserCreds) {
  const salt = bcrypt.genSaltSync();
  const passwordSaltedHash = bcrypt.hashSync(newUserCreds.password, salt);

  //compile user info
  return {
    username: newUserCreds.username,
    passwordHash: passwordSaltedHash,
    salt,
  };
}

function authorizeUser(authInfo) {
  return dbFuncs.getUserInfo(authInfo.username).then((data) => {
    const userInfo = data[0];
    if (userInfo) {
      const passwordValid = bcrypt.compareSync(
        authInfo.password,
        userInfo.passwordHash
      );
      return passwordValid;
    } else return false;
  });
}

function registerUser(newUserCreds) {
  return dbFuncs.checkUserExists(newUserCreds.username).then((data) => {
    if (data[0].userExists === 0) {
      // there's no user with that username
      const newUsrInfo = createNewUserEntry(newUserCreds);
      // make query to insert the user into DB
      return dbFuncs.postUserInfo(newUsrInfo).then((data) => {
        if (data.insertId) {
          // user created successfully

          return 200;
        } else {
          return 500;
        }
      });
    } else {
      return 409;
    }
  });
}

function checkAdminPrivelege(token) {
  return dbFuncs.getUsernameForToken(token).then((data) => {
    if (data.length === 0) {
      return false;
    }
    console.log(data);
    const username = data[0].username;
    return username === "admin";
  });
}

function createTokenFor(username) {
  const token = getRandString(30);
  return dbFuncs.postToken(username, token).then((data) => {
    if (data.insertId) {
      // token created successfully
      return token;
    } else {
      return null;
    }
  });
}

function removeToken(token) {
  return dbFuncs.deleteToken(token);
}

function checkToken(username, token) {
  return dbFuncs.getUsernameForToken(token).then((data) => {
    if (data.length === 0) {
      return false;
    }
    console.log(data);
    const foundUsername = data[0].username;
    return username === foundUsername;
  });
}

module.exports = {
  isRequestQueryValid,
  getNewUserInfo: createNewUserEntry,
  authorizeUser,
  registerUser,
  createTokenFor,
  removeToken,
  checkToken,
  checkAdminPrivelege,
};
