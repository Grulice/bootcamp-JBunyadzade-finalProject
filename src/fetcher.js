const SERVER_BASEURL = "http://localhost:3001";

export function getUserToken(username, password) {
  const reqBody = { username: username, password: password };
  return fetch(`/api/gettoken`, {
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
  return fetch(`/api/register`, {
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
  return fetch(`/api/countries`).then((response) => response.json());
}

export function getMetals() {
  return fetch(`/api/materials`).then((response) => response.json());
}

export function getCategories() {
  return fetch(`/api/categories`).then((response) => response.json());
}

export function getDict(tableName) {
  return fetch(`/api/${tableName}`).then((response) => response.json());
}

export function postToDict(tableName, token, insertValObject) {
  return fetch(`/api/${tableName}`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(insertValObject),
  }).then((response) => response.status === 200);
}

export function getSearchResults(queryParams) {
  return fetch(`/api/search${queryParams}`).then((response) => {
    return response.json();
  });
}

export function getCoinInfo(coinId) {
  return fetch(`/api/coin/${coinId}`).then((response) => response.json());
}

export function getMultipleCoinInfo(coinIds) {
  return fetch(`/api/coin/${coinIds.join(",")}`).then((response) =>
    response.json()
  );
}

export function createCoin(token) {
  return fetch(`/api/coin`, {
    method: "POST",
    headers: {
      token,
    },
  }).then((response) => response.json());
}

export function putCoin(token, formData, coinId) {
  return fetch(`/api/coin/${coinId}`, {
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
  return fetch(`/api/coin/${id}`, {
    method: "DELETE",
    headers: {
      token,
    },
  }).then((response) => response.status === 200);
}

export function getSimilarCoins(id) {
  return fetch(`/api/similarcoins/${id}`).then((response) => response.json());
}

export function sendOrder(username, token, orderInfo) {
  return fetch(`/api/orders/${username}`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderInfo),
  }).then((response) => response.json());
}

export function getOrders(username, token) {
  return fetch(`/api/orders/${username}`, {
    method: "GET",
    headers: {
      token,
    },
  }).then((response) => response.json());
}

export function getAllOrders(token) {
  return fetch(`/api/orders`, {
    method: "GET",
    headers: {
      token,
    },
  }).then((response) => response.json());
}

export function putOrderStatus(token, orderId, status) {
  const reqbody = { status };
  return fetch(`/api/orders/${orderId}`, {
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
  return fetch(`/api/coinview/${id}`, {
    method: "POST",
  }).then((response) => response.status === 200);
}

export function postHistoryView(username, token, coin_id) {
  const reqbody = { coin_id };
  return fetch(`/api/history/${username}`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqbody),
  }).then((response) => response.status === 200);
}

export function getHistoryViews(username, token) {
  return fetch(`/api/history/${username}`, {
    method: "GET",
    headers: {
      token,
    },
  }).then((response) => response.json());
}
