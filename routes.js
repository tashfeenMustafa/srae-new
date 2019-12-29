const express = require('express');
const router = express.Router();
const pool = require('./db.js');

/*
  Get Orders from OC_ORDER table from database
  to show in Orders Page
*/
router.get('/api/v1/orders', (req, res) => {
    pool.getConnection((err, connection) => {
    if (err) {
      // not connected!
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'SELECT order_id, customer_id, customer_group_id, firstname, lastname, email, telephone, payment_firstname, payment_lastname, payment_company, payment_address_1, payment_address_2, payment_city, payment_postcode, payment_country, payment_zone, payment_method, total, total_owner_profit, total_customer_profit, affiliate_id, commission, tracking, date_added, date_modified FROM oc_order ORDER BY date_added DESC';

    // Use the connection
    connection.query(sql, (error, orders) => {
  	  	if(error){
  	  		res.json({"status": 500, "error": error, "response": orders});
  	  		//If there is error, we send the error in the error section with 500 status
  	  	} else {
    			//res.json({"status": 200, "error": 'No Error', "response": results});
    			//If there is no error, all is good and response is 200OK.
          res.json({"status": 200, "message": 'success', "response": orders});
  	  	}
    });


    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });
});

/* 
  When clicked on View Orders, orderID is sent to this API
  and individual products and corresponding details are
  called from the database and sent to front-end App
*/
router.get('/api/v1/orderproducts', (req, res) => {
    const orderID = req.query.order_id;
    pool.getConnection((err, connection) => {
        if (err) {
          // not connected!
          console.log('API couldn\'t connect to Database: ' + err);
          return;
        }
    
        let sql = 'SELECT * FROM oc_order_product WHERE order_id=' + connection.escape(orderID);
    
        // Use the connection
        connection.query(sql, (error, orderProducts) => {
            if(error){
              res.json({"status": 500, "error": error, "response": orderProducts});
              //If there is error, we send the error in the error section with 500 status
            } else {
              //res.json({"status": 200, "error": 'No Error', "response": results});
              //If there is no error, all is good and response is 200OK.
              res.json({"status": 200, "message": 'success', "response": orderProducts});
            }
        });
    
        // When done with the connection, release it.
        connection.release();
    
        // Handle error after the release.
        if (err) {
          console.log('Error in release MySQL database connection. Error: ' + err);
          return;
        }
    
      });
    
});

/*
  Get customer details for Order Products Page
*/
router.get('/api/v1/customerdetails', (req, res) => {
  const customerID = req.query.customer_id;
  pool.getConnection(function(err, connection) {
      if (err) {
        // not connected!
        console.log('API couldn\'t connect to Database: ' + err);
        return;
      }
  
      let sql = 'SELECT * FROM oc_customer WHERE customer_id=' + connection.escape(customerID);
  
      // Use the connection
      connection.query(sql, (error, customerDetails) => {
          if(error){
            res.json({"status": 500, "error": error, "response": customerDetails});
            //If there is error, we send the error in the error section with 500 status
          } else {
            //res.json({"status": 200, "error": 'No Error', "response": results});
            //If there is no error, all is good and response is 200OK.
            res.json({"status": 200, "message": 'success', "response": customerDetails});
          }
      });
  
      // When done with the connection, release it.
      connection.release();
  
      // Handle error after the release.
      if (err) {
        console.log('Error in release MySQL database connection. Error: ' + err);
        return;
      }
  
    });
  
});

/*
  Get Customer data for Customer page
*/
router.get('/api/v1/customers', (req, res) => {
  
  pool.getConnection((err, connection) => {
      if (err) {
        // not connected!
        console.log('API couldn\'t connect to Database: ' + err);
        return;
      }
  
      let sql = 'SELECT * FROM oc_customer ORDER BY customer_id DESC';
  
      // Use the connection
      connection.query(sql, (error, customers) => {
          if(error){
            res.json({"status": 500, "error": error, "response": customers});
            //If there is error, we send the error in the error section with 500 status
          } else {
            //res.json({"status": 200, "error": 'No Error', "response": results});
            //If there is no error, all is good and response is 200OK.
            res.json({"status": 200, "message": 'success', "response": customers});
          }
      });
  
      // When done with the connection, release it.
      connection.release();
  
      // Handle error after the release.
      if (err) {
        console.log('Error in release MySQL database connection. Error: ' + err);
        return;
      }
  
    });
  
});

/*
  Get Referred By Name of each customer
*/
router.get('/api/v1/referredby', (req, res) => {
  let parentID = req.query.parent_id;
  pool.getConnection((err, connection) => {
      if (err) {
        // not connected!
        console.log('API couldn\'t connect to Database: ' + err);
        return;
      }
  
      let sql = 'SELECT firstname,lastname FROM oc_customer where customer_id=' + connection.escape(parentID);
  
      // Use the connection
      connection.query(sql, (error, customers) => {
          if(error){
            res.json({"status": 500, "error": error, "response": customers});
            //If there is error, we send the error in the error section with 500 status
          } else {
            //res.json({"status": 200, "error": 'No Error', "response": results});
            //If there is no error, all is good and response is 200OK.
            res.json({"status": 200, "message": 'success', "response": customers});
          }
      });
  
      // When done with the connection, release it.
      connection.release();
  
      // Handle error after the release.
      if (err) {
        console.log('Error in release MySQL database connection. Error: ' + err);
        return;
      }
      
    });
  
});

/*
  Get Customer Transaction Data
*/
router.get('/api/v1/customer_transaction', (req, res) => {
  let customerID = req.query.customer_id;
  pool.getConnection((err, connection) => {
      if (err) {
        // not connected!
        console.log('API couldn\'t connect to Database: ' + err);
        return;
      }
  
      let sql = 'SELECT * FROM oc_customer_transaction where customer_id=' + connection.escape(customerID);
  
      // Use the connection
      connection.query(sql, (error, customerTransactions) => {
          if(error){
            res.json({"status": 500, "error": error, "response": customerTransactions});
            //If there is error, we send the error in the error section with 500 status
          } else {
            //res.json({"status": 200, "error": 'No Error', "response": results});
            //If there is no error, all is good and response is 200OK.
            res.json({"status": 200, "message": 'success', "response": customerTransactions});
          }
      });
  
      // When done with the connection, release it.
      connection.release();
  
      // Handle error after the release.
      if (err) {
        console.log('Error in release MySQL database connection. Error: ' + err);
        return;
      }
      
  });
  
});

/*
  Used to get Manufacturer ID from OC_PRODUCT table
  for each product in Order Products Page
*/
router.get('/api/v1/getmanufacturerid', (req, res) => {
  const productID = req.query.product_id;
  pool.getConnection(function(err, connection) {
      if (err) {
        // not connected!
        console.log('API couldn\'t connect to Database: ' + err);
        return;
      }
  
      let sql = 'SELECT manufacturer_id FROM oc_product WHERE product_id=' + connection.escape(productID);
  
      // Use the connection
      connection.query(sql, (error, manufacturerID) => {
          if(error){
            res.json({"status": 500, "error": error, "response": manufacturerID});
            //If there is error, we send the error in the error section with 500 status
          } else {
            //res.json({"status": 200, "error": 'No Error', "response": results});
            //If there is no error, all is good and response is 200OK.
            res.json({"status": 200, "message": 'success', "response": manufacturerID});
          }
      });
  
      // When done with the connection, release it.
      connection.release();
  
      // Handle error after the release.
      if (err) {
        console.log('Error in release MySQL database connection. Error: ' + err);
        return;
      }
  
    });
  
});

/*
  Used to get Manufacturer Name from OC_MANUFACTURER table
  for each product in Order Products Page
*/
router.get('/api/v1/getmanufacturername', (req, res) => {
  const manufacturerID = req.query.manufacturer_id;
  pool.getConnection(function(err, connection) {
      if (err) {
        // not connected!
        console.log('API couldn\'t connect to Database: ' + err);
        return;
      }
  
      let sql = 'SELECT name FROM oc_manufacturer WHERE manufacturer_id=' + connection.escape(manufacturerID);
  
      // Use the connection
      connection.query(sql, (error, manufacturerName) => {
          if(error){
            res.json({"status": 500, "error": error, "response": manufacturerName});
            //If there is error, we send the error in the error section with 500 status
          } else {
            //res.json({"status": 200, "error": 'No Error', "response": results});
            //If there is no error, all is good and response is 200OK.
            res.json({"status": 200, "message": 'success', "response": manufacturerName});
          }
      });
  
      // When done with the connection, release it.
      connection.release();
  
      // Handle error after the release.
      if (err) {
        console.log('Error in release MySQL database connection. Error: ' + err);
        return;
      }
  
    });
  
});

/*
  Get Customer data for Customer page
*/
router.get('/api/v1/paidcustomers', (req, res) => {

  pool.getConnection((err, connection) => {
    if (err) {
      // not connected!
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'SELECT * FROM oc_customer WHERE customer_group_id != 1 ORDER BY customer_id DESC';

    // Use the connection
    connection.query(sql, (error, customers) => {
      if (error) {
        res.json({
          "status": 500,
          "error": error,
          "response": customers
        });
        //If there is error, we send the error in the error section with 500 status
      } else {
        //res.json({"status": 200, "error": 'No Error', "response": results});
        //If there is no error, all is good and response is 200OK.
        res.json({
          "status": 200,
          "message": 'success',
          "response": customers
        });
      }
    });

    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });

});

/*
  Get Customer Transaction Data
*/
router.get('/api/v1/customer_transaction_sell4vets', (req, res) => {
  
  pool.getConnection((err, connection) => {
    if (err) {
      // not connected!
      console.log('API couldn\'t connect to Database: ' + err);
      return;
    }

    let sql = 'SELECT * FROM oc_customer_transaction';

    // Use the connection
    connection.query(sql, (error, customerTransactions) => {
      if (error) {
        res.json({
          "status": 500,
          "error": error,
          "response": customerTransactions
        });
        //If there is error, we send the error in the error section with 500 status
      } else {
        //res.json({"status": 200, "error": 'No Error', "response": results});
        //If there is no error, all is good and response is 200OK.
        res.json({
          "status": 200,
          "message": 'success',
          "response": customerTransactions
        });
      }
    });

    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (err) {
      console.log('Error in release MySQL database connection. Error: ' + err);
      return;
    }

  });

});

module.exports = router;