const SERVER_BASEURL = "http://localhost:3001";

export function getUserToken(username, password) {
  const reqBody = { username: username, password: password };
  return fetch(`${SERVER_BASEURL}/gettoken`, {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((unparsed) => {
      return unparsed.json();
    })
    .then((parsed) => {
      return parsed.token;
    });
}

export function registerUser(username, password) {
  const reqBody = { username, password };
  return fetch(`${SERVER_BASEURL}/register`, {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.status;
  });
}

export function getCountries() {
  return fetch(`${SERVER_BASEURL}/countries`).then((response) =>
    response.json()
  );
}

export function getMetals() {
  return fetch(`${SERVER_BASEURL}/materials`).then((response) =>
    response.json()
  );
}

export function getCategories() {
  return fetch(`${SERVER_BASEURL}/categories`).then((response) =>
    response.json()
  );
}

export function getDict(tableName) {
  return fetch(`${SERVER_BASEURL}/${tableName}`).then((response) =>
    response.json()
  );
}

export function postToDict(tableName, token, insertValObject) {
  return fetch(`${SERVER_BASEURL}/${tableName}`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(insertValObject),
  }).then((response) => response.status === 200);
}

export function getSearchResults(queryParams) {
  return fetch(`${SERVER_BASEURL}/search${queryParams}`).then((response) => {
    return response.json();
  });
}

export function getCoinInfo(coinId) {
  return fetch(`${SERVER_BASEURL}/coin/${coinId}`).then((response) =>
    response.json()
  );
}

export function getMultipleCoinInfo(coinIds) {
  return fetch(`${SERVER_BASEURL}/coin/${coinIds.join(",")}`).then((response) =>
    response.json()
  );
}

export function createCoin(token) {
  return fetch(`${SERVER_BASEURL}/coin`, {
    method: "POST",
    headers: {
      token,
    },
  }).then((response) => response.json());
}

export function putCoin(token, formData, coinId) {
  return fetch(`${SERVER_BASEURL}/coin/${coinId}`, {
    method: "PUT",
    headers: {
      token,
    },
    body: formData,
  }).then((response) => {
    return response.status === 200;
  });
}

export function deleteCoin(id, token) {
  return fetch(`${SERVER_BASEURL}/coin/${id}`, {
    method: "DELETE",
    headers: {
      token,
    },
  }).then((response) => response.status === 200);
}

export function getSimilarCoins(id) {
  return fetch(`${SERVER_BASEURL}/similarcoins/${id}`).then((response) =>
    response.json()
  );
}

export function sendOrder(username, token, orderInfo) {
  console.log(JSON.stringify(orderInfo));
  return fetch(`${SERVER_BASEURL}/orders/${username}`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderInfo),
  }).then((response) => response.json());
}

export function getOrders(username, token) {
  return fetch(`${SERVER_BASEURL}/orders/${username}`, {
    method: "GET",
    headers: {
      token,
    },
  }).then((response) => response.json());
}

export function getAllOrders(token) {
  return fetch(`${SERVER_BASEURL}/orders`, {
    method: "GET",
    headers: {
      token,
    },
  }).then((response) => response.json());
}

export function putOrderStatus(token, orderId, status) {
  const reqbody = { status };
  console.log("in fetcher", reqbody);
  return fetch(`${SERVER_BASEURL}/orders/${orderId}`, {
    method: "PUT",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqbody),
  }).then((response) => {
    return response.status === 200;
  });
}

export function postCoinView(id) {
  return fetch(`${SERVER_BASEURL}/coinview/${id}`, {
    method: "POST",
  }).then((response) => response.status === 200);
}
