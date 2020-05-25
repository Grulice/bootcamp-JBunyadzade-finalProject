const mysql = require("mysql");
const conn = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  database: "coins",
  multipleStatements: true,
});

function sendQuery(connection, query, params) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function getCoinCount() {
  const query = `SELECT count(*) as totalCount from coins`;
  const params = [];
  return sendQuery(conn, query, params);
}

function getCoins(offset, count) {
  const query = `SELECT
  coins.id,
  name,
  country,
  material,
  quality,
  denomination,
  issue_year,
  weight,
  price,
  img_obverse,
  img_reverse,
  desc_short,
  desc_long
FROM
  coins
  join countries
  join materials
where
  country_id = countries.id
  and material_id = materials.id
limit
  ?, ?;`;
  const params = [offset, count];
  return sendQuery(conn, query, params);
}

function postCoin() {
  const query = `insert into coins values()`;
  const params = [];
  return sendQuery(conn, query, params);
}

function addView(id) {
  const query = `update coins set views = views + 1 where id = ?`;
  const params = [id];
  return sendQuery(conn, query, params);
}

function putCoin(coinInfo) {
  const {
    id,
    country_id,
    material_id,
    quality,
    denomination,
    issue_year,
    weight,
    price,
    category_id,
    name,
    desc_short,
    desc_long,
  } = coinInfo;

  const query = `update coins 
  set 
    country_id = ?,
      material_id = ?,
      quality = ?,
      denomination = ?,
      issue_year = ?,
      weight = ?,
      price = ?,
      category_id = ?,
      name = ?,
      desc_short = ?,
      desc_long = ?
  where
    id = ?
      `;
  const params = [
    country_id,
    material_id,
    quality,
    denomination,
    issue_year,
    weight,
    price,
    category_id,
    name,
    desc_short,
    desc_long,
    id,
  ];
  console.warn(params);
  return sendQuery(conn, query, params);
}

function deleteCoin(id) {
  const query = `delete from coins where id=?`;
  const params = [id];
  return sendQuery(conn, query, params);
}

function getCoinsById(idList) {
  const query = `SELECT
  coins.id,
  name,
  country_id,
  country,
  material_id,
  material,
  category_id,
  category,
  quality,
  denomination,
  issue_year,
  weight,
  price,
  desc_short,
  desc_long
  
FROM
  coins
  left join countries on country_id = countries.id
  left join materials on material_id = materials.id
  left join categories on category_id = categories.id
where
  coins.id in (?)`;
  const params = [idList];
  return sendQuery(conn, query, params);
}

function getCoinsByCriteria(criteria, offset, count) {
  // trim single quotes before passing as param to '%TEXT%' to avoid getting '%'TEXT'%'
  const searchText = criteria.searchText
    ? conn.escape(criteria.searchText).replace(/'/g, "")
    : null;
  const countryId = criteria.countryId ? conn.escape(criteria.countryId) : null;
  const materialId = criteria.materialId
    ? conn.escape(criteria.materialId)
    : null;
  const categoryId = criteria.categoryId
    ? conn.escape(criteria.categoryId)
    : null;
  const quality = criteria.quality ? conn.escape(criteria.quality) : null;
  const pricemin = criteria.pricemin ? conn.escape(criteria.pricemin) : null;
  const pricemax = criteria.pricemax ? conn.escape(criteria.pricemax) : null;
  const yearmin = criteria.yearmin ? conn.escape(criteria.yearmin) : null;
  const yearmax = criteria.yearmax ? conn.escape(criteria.yearmax) : null;
  const offsetEscaped = conn.escape(offset);
  const countEscaped = conn.escape(count);

  let baseQuery = `SELECT DISTINCT
     id,
    name,
    desc_short,
    desc_long,
    views
FROM
    (
        SELECT
            1 AS rnk,
            id,
            country_id,
            material_id,
            category_id,
            quality,
            price,
            issue_year,
            name,
            desc_short,
            desc_long,
            views
        FROM
            coins
        WHERE
            name LIKE '%${searchText || ""}%'
        UNION
        SELECT
            2 AS rnk,
            id,
            country_id,
            material_id,
            category_id,
            quality,
            price,
            issue_year,
            name,
            desc_short,
            desc_long,
            views
        FROM
            coins
        WHERE
            desc_short LIKE '%${searchText || ""}%'
        UNION
        SELECT
            3 AS rnk,
            id,
            country_id,
            material_id,
            category_id,
            quality,
            price,
            issue_year,
            name,
            desc_short,
            desc_long,
            views
        FROM
            coins
        WHERE
            desc_long LIKE '%${searchText || ""}%'
    ) tab
WHERE
    TRUE
    ${countryId ? `AND country_id = ${countryId}` : ""}
    ${materialId ? `AND material_id = ${materialId}` : ""}
    ${categoryId ? `AND category_id = ${categoryId}` : ""}
    ${quality ? `AND quality = ${quality}` : ""}
    ${pricemin ? `AND price >= ${pricemin}` : ""}
    ${pricemax ? `AND price <= ${pricemax}` : ""}
    ${yearmin ? `AND issue_year >= ${yearmin}` : ""}
    ${yearmax ? `AND issue_year <= ${yearmax}` : ""}
ORDER BY
    rnk, id`;

  const countQuery = `SELECT count(*) as count from (${baseQuery}) tb`;
  const mainQuery = `${baseQuery} limit ${offsetEscaped}, ${countEscaped}`;
  const params = [];
  return Promise.all([
    sendQuery(conn, countQuery, params),
    sendQuery(conn, mainQuery, params),
  ]);
}

function getSimilarCoins(id) {
  const query = `set @target_id = ?;
  select @target_year := issue_year, @target_country := country_id, @target_category := category_id from coins where id = @target_id;
    
    SELECT DISTINCT
      id, name, year_diff
  FROM
      (SELECT 
          1 AS rnk,
              id,
              country_id,
              ABS(issue_year - @target_year) AS year_diff,
              category_id,
              name
      FROM
          coins
      WHERE
          country_id = @target_country 
    UNION (SELECT 
          2 AS rnk,
              id,
              country_id,
              ABS(issue_year - @target_year) AS year_diff,
              category_id,
              name
      FROM
          coins
      WHERE
          @target_category = category_id
      LIMIT 10)
          UNION (SELECT 
          3 AS rnk,
              id,
              country_id,
              ABS(issue_year - @target_year) AS year_diff,
              category_id,
              name
      FROM
          coins
      WHERE
          ABS(issue_year - @target_year) < 20
      LIMIT 10)) tab
  WHERE
      id != @target_id
  ORDER BY rnk , year_diff
  `;
  const params = [id];
  return sendQuery(conn, query, params);
}

function getCountries() {
  const query = `SELECT
  id,
  country
FROM
  countries
ORDER BY
  country`;
  const params = [];
  return sendQuery(conn, query, params);
}

function postCountry(country) {
  const query = `insert into countries values 
  (NULL, ?)`;
  const params = [country];
  return sendQuery(conn, query, params);
}

function getMaterials() {
  const query = `SELECT
  id,
  material
FROM
  materials`;
  const params = [];
  return sendQuery(conn, query, params);
}

function postMaterial(material) {
  const query = `insert into materials values 
  (NULL, ?)`;
  const params = [material];
  return sendQuery(conn, query, params);
}

function getCategories() {
  const query = `SELECT
  id,
  category
FROM
  categories`;
  const params = [];
  return sendQuery(conn, query, params);
}

function postCategory(category) {
  const query = `insert into categories values 
  (NULL, ?)`;
  const params = [category];
  return sendQuery(conn, query, params);
}

function checkUserExists(username) {
  const query = `SELECT
  EXISTS(
      SELECT
          *
      FROM
          users
      WHERE
          username = ?
  ) as userExists`;
  const params = [username];
  return sendQuery(conn, query, params);
}

function getUserInfo(username) {
  const query = `SELECT
  username,
  passwordHash
FROM
  coins.users
where
  username = ?`;
  const params = [username];
  return sendQuery(conn, query, params);
}

function postUserInfo(userInfo) {
  const { username, passwordHash } = userInfo;
  const query = `insert into
  coins.users (
    id,
    username,
    passwordHash
  )
values
  (
    NULL,
    ?,
    ?
  );`;
  const params = [username, passwordHash];
  return sendQuery(conn, query, params);
}

function getUsernameForToken(token) {
  const query = `SELECT
  username
FROM
  coins.tokens
WHERE
  token = ?`;
  const params = [token];
  return sendQuery(conn, query, params);
}

function postToken(username, token) {
  const query = `insert into
  coins.tokens (username, token)
values
  (
    ?,
    ?
  );`;
  const params = [username, token];
  return sendQuery(conn, query, params);
}

function deleteToken(token) {
  const query = `delete from
  coins.tokens
where
  token = ?`;
  const params = [token];
  return sendQuery(conn, query, params);
}

function getAllOrders() {
  const query = `SELECT * from orders`;
  const params = [];
  return sendQuery(conn, query, params);
}

function getOrdersFor(username) {
  const query = `SELECT * from orders where username=?`;
  const params = [username];
  return sendQuery(conn, query, params);
}

function postOrder(orderInfo) {
  const { username, order_contents, order_date, shipping_address } = orderInfo;
  const query = `insert into 
  orders(username, order_contents, order_date, shipping_address) 
  values
  (?, ?, ? ,?);`;
  const params = [
    username,
    JSON.stringify(order_contents),
    order_date,
    shipping_address,
  ];

  return sendQuery(conn, query, params);
}

function putOrderStatus(id, newStatus) {
  const query = `update 
  coins.orders 
set 
  status = ?
where 
  id = ?`;
  const params = [newStatus, id];
  return sendQuery(conn, query, params);
}

module.exports = {
  sendQuery,
  getCoinCount,
  getCoins,
  postCoin,
  addView,
  putCoin,
  deleteCoin,
  getCoinsById,
  getCoinsByCriteria,
  getSimilarCoins,
  getCountries,
  postCountry,
  getMaterials,
  postMaterial,
  getCategories,
  postCategory,
  getUserInfo,
  postUserInfo,
  checkUserExists,
  getUsernameForToken,
  postToken,
  deleteToken,
  getAllOrders,
  getOrdersFor,
  postOrder,
  putOrderStatus,
};
