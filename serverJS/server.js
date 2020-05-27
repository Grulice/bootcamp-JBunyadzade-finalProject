const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const utilFuncs = require("./server_utilFuncs");
const dbFuncs = require("./server_dbFuncs");

const app = express();
const PORT = 3001;
const upload = multer({
  dest: "./temp",
}); // for image upload

app.use(express.json());
app.use(cors());

//#region AUTH
app.post("/register", (req, res) => {
  const newUserCreds = {
    username: req.body.username,
    password: req.body.password,
  };

  utilFuncs
    .registerUser(newUserCreds)
    .then((result) => {
      console.log(result);
      if (result === 409) {
        console.log(`Error status 409 on user register, server.js`);
        res.sendStatus(409);
      }
      if (result === 200) {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      console.log(`Error status 500 on user register, server.js: ${err}`);
      res.sendStatus(500);
    });
});

app.post("/gettoken", (req, res) => {
  const authInfo = { username: req.body.username, password: req.body.password };
  utilFuncs.authorizeUser(authInfo).then((isAuthorized) => {
    if (isAuthorized) {
      utilFuncs
        .createTokenFor(authInfo.username)
        .then((token) => res.json({ username: authInfo.username, token }));
    } else {
      res.sendStatus(401);
    }
  });
});

app.get("/logout", (req, res) => {
  const { token } = req.headers;
  utilFuncs
    .removeToken(token)
    .then((result) => {
      if (result.affectedRows) res.sendStatus(200);
      else res.sendStatus(404);
    })
    .catch((err) => {
      console.log(`Error status 500 on user logout, server.js: ${err}`);
      res.sendStatus(500);
    });
});
//#endregion AUTH END

//#region COINS
app.get("/coin", (req, res) => {
  const count = parseInt(req.query.count);
  const offset = parseInt(req.query.offset);

  if (utilFuncs.isRequestQueryValid(req.query)) {
    dbFuncs
      .getCoins(offset, count)
      .then((data) => {
        if (data) {
          dbFuncs.getCoinCount().then((coinCount) => {
            const finalResponse = { data, ...coinCount[0] };
            res.json(finalResponse);
          });
        }
      })
      .catch((err) => {
        console.log(`Error status 500 on get all coins, server.js: ${err}`);
        res.sendStatus(500);
      });
  } else {
    res.status(400);
    console.log(`Error status 400 on get all coins, server.js`);
    res.json({ error: "Invalid request" });
  }
});

app.post("/coin", (req, res) => {
  const { token } = req.headers;
  //only the admin can add countries
  utilFuncs.checkAdminPrivelege(token).then((isAdmin) => {
    if (isAdmin) {
      dbFuncs.postCoin().then((data) => {
        if (data.insertId) {
          // new coin entry created successfully
          res.json({ insertId: data.insertId });
        } else {
          console.log(`Error status 500 on post coin, server.js`);
          res.sendStatus(500);
        }
      });
    } else {
      console.log(`Error status 403 on post coin, server.js`);
      res.sendStatus(403);
    }
  });
});

app.put("/coin/:id", upload.any(), (req, res) => {
  const { token } = req.headers;
  //only the admin can add countries
  utilFuncs.checkAdminPrivelege(token).then((isAdmin) => {
    if (isAdmin) {
      const targetId = parseInt(req.params.id);
      console.log(targetId);
      const {
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
      } = req.body;
      const coinInfo = {
        id: targetId,
        country_id: parseInt(country_id) ? parseInt(country_id) : null,
        material_id: parseInt(material_id) ? parseInt(material_id) : null,
        quality: quality || "",
        denomination: denomination || "",
        issue_year: parseInt(issue_year) ? parseInt(issue_year) : null,
        weight: Number(weight) ? Number(weight) : null,
        price: Number(price) ? Number(price) : null,
        category_id: parseInt(category_id) ? parseInt(category_id) : null,
        name: name || "Unnamed",
        desc_short: desc_short || "",
        desc_long: desc_long || "",
      };
      dbFuncs
        .putCoin(coinInfo)
        .then((data) => {
          if (data.affectedRows) {
            // coin entry updated successfully

            // handle image uploads
            for (let file of req.files) {
              const tempPath = file.path;
              const targetPath = path.join(
                __dirname,
                `/img/${file.originalname}`
              );
              const extension = path.extname(file.originalname).toLowerCase();
              if (extension === ".png" || extension === ".jpg") {
                fs.rename(tempPath, targetPath, (err) => {
                  if (err) {
                    console.log(
                      `Error status 500 on image post (file rename), server.js`
                    );
                    return res.status(500);
                  }
                });
              } else {
                fs.unlink(tempPath, (err) => {
                  if (err) {
                    console.log(
                      `Error status 500 on image post (file unlink), server.js`
                    );
                    return res.status(500);
                  }
                  console.log(
                    `Error status 415 on image post (unsupported file type), server.js`
                  );
                  return res.status(415);
                });
              }
            }
            return res.sendStatus(200);
          } else {
            console.log(`Error status 500 on put coin, server.js`);
            res.status(500);
          }
        })
        .catch((err) => res.status(500));
    } else {
      console.log(`Error status 403 on put coin, server.js`);
      res.sendStatus(403);
    }
  });
});

app.delete("/coin/:id", (req, res) => {
  const { token } = req.headers;
  //only the admin can add countries
  utilFuncs.checkAdminPrivelege(token).then((isAdmin) => {
    if (isAdmin) {
      const targetId = parseInt(req.params.id);
      dbFuncs.deleteCoin(targetId).then((data) => {
        if (data.affectedRows) {
          // new coin entry created successfully
          res.sendStatus(200);
        } else {
          console.log(`Error status 500 on delete coin, server.js`);
          res.sendStatus(500);
        }
      });
    } else {
      console.log(`Error status 403 on delete coin, server.js`);
      res.sendStatus(403);
    }
  });
});

app.get("/coin/:idlist", (req, res) => {
  const idList = req.params.idlist;
  // check that all ids are numbers
  const splitIDlist = idList.split(",").map((id) => parseInt(id));
  for (let id of splitIDlist) {
    if (isNaN(id)) {
      console.log(`Error status 400 on get coins by id, server.js`);
      return res.sendStatus(400);
    }
  }
  dbFuncs
    .getCoinsById(splitIDlist)
    .then((data) => {
      if (data.length !== 0) res.json(data);
      else res.sendStatus(404);
    })
    .catch((err) => {
      console.log(`Error status 500 on get coins by id, server.js: ${err}`);
      res.sendStatus(500);
    });
});

app.post("/coinview/:id", (req, res) => {
  const targetId = parseInt(req.params.id);
  dbFuncs.addView(targetId).then((data) => {
    if (data.affectedRows) return res.sendStatus(200);
    else return res.sendStatus(500);
  });
});

app.get("/similarcoins/:id", (req, res) => {
  const targetId = parseInt(req.params.id);
  dbFuncs
    .getSimilarCoins(targetId)
    .then((data) => {
      res.json(data[2]);
    })
    .catch((err) => {
      console.log(`Error status 500 on get similar coins, server.js: ${err}`);
      res.sendStatus(500);
    });
});

app.get("/search", (req, res) => {
  const count = parseInt(req.query.count);
  const offset = parseInt(req.query.offset);

  if (utilFuncs.isRequestQueryValid(req.query)) {
    const {
      searchText,
      countryId,
      materialId,
      categoryId,
      quality,
      pricemin,
      pricemax,
      yearmin,
      yearmax,
    } = req.query;

    const searchCriteria = {
      searchText,
      countryId: isNaN(countryId) ? null : +countryId,
      materialId: isNaN(materialId) ? null : +materialId,
      categoryId: isNaN(categoryId) ? null : +categoryId,
      quality,
      pricemin: isNaN(pricemin) ? null : +pricemin,
      pricemax: isNaN(pricemax) ? null : +pricemax,
      yearmin: isNaN(yearmin) ? null : +yearmin,
      yearmax: isNaN(yearmax) ? null : +yearmax,
    };

    dbFuncs
      .getCoinsByCriteria(searchCriteria, offset, count)
      .then((data) => {
        const count = data[0][0].count;
        const mainData = data[1];
        const finalResponse = { count, data: mainData };
        res.json(finalResponse);
      })
      .catch((err) => {
        console.log(`Error status 500 on search coins, server.js: ${err}`);
        res.sendStatus(500);
      });
  }
});
//#endregion COINS END

//#region DICTIONARIES
app.get("/countries", (req, res) => {
  dbFuncs
    .getCountries()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(`Error status 500 on get countries, server.js: ${err}`);
      res.sendStatus(500);
    });
});

app.post("/countries", (req, res) => {
  const { token } = req.headers;
  //only the admin can add countries
  utilFuncs.checkAdminPrivelege(token).then((isAdmin) => {
    if (isAdmin) {
      const { country } = req.body;
      dbFuncs.postCountry(country).then((data) => {
        if (data.insertId) {
          // country created successfully
          res.sendStatus(200);
        } else {
          console.log(`Error status 500 on post country, server.js`);
          res.sendStatus(500);
        }
      });
    } else {
      console.log(`Error status 403 on post country, server.js`);
      res.sendStatus(403);
    }
  });
});

app.get("/materials", (req, res) => {
  dbFuncs
    .getMaterials()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(`Error status 500 on get materials, server.js: ${err}`);
      res.sendStatus(500);
    });
});

app.post("/materials", (req, res) => {
  const { token } = req.headers;
  //only the admin can add materials
  utilFuncs.checkAdminPrivelege(token).then((isAdmin) => {
    if (isAdmin) {
      const { material } = req.body;
      dbFuncs.postMaterial(material).then((data) => {
        if (data.insertId) {
          // material created successfully
          res.sendStatus(200);
        } else {
          console.log(`Error status 500 on post materials, server.js`);
          res.sendStatus(500);
        }
      });
    } else {
      console.log(`Error status 403 on get materials, server.js`);
      res.sendStatus(403);
    }
  });
});

app.get("/categories", (req, res) => {
  dbFuncs
    .getCategories()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(`Error status 500 on get categories, server.js: ${err}`);
      res.sendStatus(500);
    });
});

app.post("/categories", (req, res) => {
  const { token } = req.headers;
  //only the admin can add categories
  utilFuncs.checkAdminPrivelege(token).then((isAdmin) => {
    if (isAdmin) {
      const { category } = req.body;
      dbFuncs.postMaterial(category).then((data) => {
        if (data.insertId) {
          // category created successfully
          res.sendStatus(200);
        } else {
          console.log(`Error status 500 on post categories, server.js`);
          res.sendStatus(500);
        }
      });
    } else {
      console.log(`Error status 403 on get categories, server.js`);
      res.sendStatus(403);
    }
  });
});
//#endregion DICTIONARIES END

//IMAGE SERVING
app.get("/image/:name", (req, res) => {
  const options = {
    root: path.join(__dirname, "img"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  const fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(`Error 404 at get image, server js: ${err}`);
      return res.sendStatus(404);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

//#region ORDERS
app.get("/orders/:username", (req, res) => {
  const { username } = req.params;
  const { token } = req.headers;
  utilFuncs
    .checkToken(username, token)
    .then((tokenValid) => {
      if (tokenValid) {
        dbFuncs.getOrdersFor(username).then((data) => res.json(data));
      } else {
        return res.sendStatus(403);
      }
    })
    .catch((err) => {
      console.log(
        `Error status 500 on get orders for username, server.js: ${err}`
      );
      res.sendStatus(500);
    });
});

app.post("/orders/:username", (req, res) => {
  const { username } = req.params;
  const { token } = req.headers;
  utilFuncs
    .checkToken(username, token)
    .then((tokenValid) => {
      if (tokenValid) {
        // post order
        const dateObj = new Date();
        const isoStr = dateObj.toISOString();
        const order_date =
          isoStr.substring(0, 10) + " " + isoStr.substring(11, 19);
        const orderInfo = { ...req.body, username, order_date };
        console.log(req.body, orderInfo);
        dbFuncs.postOrder(orderInfo).then((data) => {
          if (data.insertId) {
            // new order entry created successfully
            res.json({ insertId: data.insertId });
          } else {
            console.log(`Error status 500 on post coin, server.js`);
            res.sendStatus(500);
          }
        });
      } else {
        return res.sendStatus(403);
      }
    })
    .catch((err) => {
      console.log(
        `Error status 500 on get orders for username, server.js: ${err}`
      );
      res.sendStatus(500);
    });
});

app.get("/orders", (req, res) => {
  const { token } = req.headers;
  //only the admin can get all orders
  utilFuncs.checkAdminPrivelege(token).then((isAdmin) => {
    if (isAdmin) {
      dbFuncs.getAllOrders().then((data) => {
        if (data) {
          // new coin entry created successfully
          res.json(data);
        } else {
          console.log(`Error status 500 on get all orders, server.js`);
          res.sendStatus(500);
        }
      });
    } else {
      console.log(`Error status 403 on get all orders, server.js`);
      res.sendStatus(403);
    }
  });
});

app.put("/orders/:id", (req, res) => {
  const { token } = req.headers;
  //only the admin can get all orders
  utilFuncs.checkAdminPrivelege(token).then((isAdmin) => {
    if (isAdmin) {
      const targetId = parseInt(req.params.id);
      const newStatus = req.body.status;
      dbFuncs.putOrderStatus(targetId, newStatus).then((data) => {
        if (data.affectedRows) {
          // status updated successfully
          return res.sendStatus(200);
        } else {
          console.log(`Error status 500 on update order status, server.js`);
          res.sendStatus(500);
        }
      });
    } else {
      console.log(`Error status 403 on update order status, server.js`);
      res.sendStatus(403);
    }
  });
});

//#endregion ORDERS END

//#region VIEW HISTORY
app.post("/history/:username", (req, res) => {
  const { username } = req.params;
  const { token } = req.headers;
  const { coin_id } = req.body;
  utilFuncs
    .checkToken(username, token)
    .then((tokenValid) => {
      if (tokenValid) {
        // post view
        const dateObj = new Date();
        const isoStr = dateObj.toISOString();
        const view_time =
          isoStr.substring(0, 10) + " " + isoStr.substring(11, 19);
        dbFuncs.postHistoryView(username, coin_id, view_time).then((data) => {
          if (data.insertId) {
            // new history entry created successfully
            return res.sendStatus(200);
          } else {
            console.log(`Error status 500 on post coin, server.js`);
            res.sendStatus(500);
          }
        });
      } else {
        return res.sendStatus(403);
      }
    })
    .catch((err) => {
      console.log(
        `Error status 500 on get orders for username, server.js: ${err}`
      );
      res.sendStatus(500);
    });
});

app.get("/history/:username", (req, res) => {
  const { username } = req.params;
  const { token } = req.headers;
  utilFuncs
    .checkToken(username, token)
    .then((tokenValid) => {
      if (tokenValid) {
        dbFuncs.getHistoryViews(username).then((data) => {
          return res.json(data);
        });
      } else {
        return res.sendStatus(403);
      }
    })
    .catch((err) => {
      console.log(
        `Error status 500 on get orders for username, server.js: ${err}`
      );
      res.sendStatus(500);
    });
});

//#endregion
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
