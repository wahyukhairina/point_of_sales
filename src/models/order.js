const connection = require("../config/mysql");

module.exports = {
  order: transaction => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO transaction SET ?",
        transaction,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },
  order_details: data => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO transaction_details SET ?",
        data,
        (error, result) => {
          if (error) reject(new Error(error));
          connection.query(
            "SELECT stock, id from product where id = ?",
            data.product_id,
            (error, result) => {
              if (error) reject(new Error(error));
              result.map(e => {
                const qty = e.stock - data.quantity;
                const d = {
                  stock: qty,
                  id: e.id
                };
                connection.query(
                  `UPDATE product SET stock = ${d.stock} where id = '${d.id}'`,
                  (error, result) => {
                    if (error) reject(new Error(error));
                  }
                );
              });
            }
          );
        }
      );
    });
  },

  update_product: data => {
    console.log("update", data);
    // return new Promise((resolve, reject) => {
    //   connection.query('UPDATE transaction SET stock = ? where id = ? ', data.stock, data.product_id, (error, result) => {
    //     if(error) reject(new Error(error))
    //     resolve(result)
    //   })
    // })
  },

  getHistory: (startDate, endDate) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(transaction_total) AS total, DATE_FORMAT(data_added,'%Y-%m-%d') as date FROM transaction where data_added >= '${startDate}' and data_added <= DATE_ADD('${endDate}', INTERVAL 1 DAY) GROUP BY DATE(data_added)`,
        (error, result) => {
          if (error) reject(new Error(error));
          console.log(result);
          resolve(result);
        }
      );
    });
  }
};
