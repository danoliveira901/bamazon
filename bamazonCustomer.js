var mysql = require("mysql");

var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Ddany174053",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;

  start();
});

function start() {
  connection.query(
    "SELECT item_id, product_name, price FROM products",
    function(err, res) {
      if (err) throw err;

      var table = new Table({
        head: ["Item number", "Product name", "Price"],
        style: {
          head: ["blue"],
          compact: false,
          colAligns: ["Center"]
        }
      });
      console.log("Welcome to Bamazon! Have a browse of what's in stock...");
      console.log(`
         **       **          **                                              **                  ******                                                           
        /**      /**         /**                                             /**                 /*////**                                                          
        /**   *  /**  *****  /**  *****   ******  **********   *****        ******  ******       /*   /**   ******   **********   ******   ******  ******  ******* 
        /**  *** /** **///** /** **///** **////**//**//**//** **///**      ///**/  **////**      /******   //////** //**//**//** //////** ////**  **////**//**///**
        /** **/**/**/******* /**/**  // /**   /** /** /** /**/*******        /**  /**   /**      /*//// **  *******  /** /** /**  *******    **  /**   /** /**  /**
        /**** //****/**////  /**/**   **/**   /** /** /** /**/**////         /**  /**   /**      /*    /** **////**  /** /** /** **////**   **   /**   /** /**  /**
        /**/   ///**//****** ***//***** //******  *** /** /**//******        //** //******       /******* //******** *** /** /**//******** ******//******  ***  /**
        //       //  ////// ///  /////   //////  ///  //  //  //////          //   //////        ///////   //////// ///  //  //  //////// //////  //////  ///   // 
 
       `);
      for (var i = 0; i < res.length; i++) {
        table.push([res[i].item_id, res[i].product_name, res[i].price]);
      }
      console.log(table.toString());
      console.log(
        "----------------------------------------------------------------------------------------------------"
      );
      purchase();
    }
  );
}

function purchase() {
  connection.query("SELECT * FROM products", function(err, res) {
    inquirer
      .prompt([
        {
          name: "product",
          type: "input",
          message: "What is ID of the product they would like to buy?",
          validate: function(value) {
            if (
              isNaN(value) == false &&
              parseInt(value) <= res.length &&
              parseInt(value) > 0
            ) {
              return true;
            } else {
              return false;
            }
          }
        },
        {
          name: "order_qty",
          type: "input",
          message: "How many units of the product would you like?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])

      .then(function(answer) {
        for (var i = 0; i < res.length; i++) {
          if (res[i].item_id == answer.product) {
            var order = res[i];
          }
        }
        console.log(
          "Checking stock for your order: " +
            answer.order_qty +
            " unit(s) of " +
            order.product_name +
            "..."
        );
        console.log("");
        var updatedStockQty =
          parseInt(order.stock_quantity) - parseInt(answer.order_qty);
        if (order.stock_quantity < parseInt(answer.order_qty)) {
          console.log(
            "Sorry, we have don't this product in stock. Please revise your order."
          );
          console.log("");
          purchase();
        } else if (order.stock_quantity >= parseInt(answer.order_qty)) {
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: updatedStockQty
              },
              {
                item_id: order.item_id
              }
            ],
            function(err, res) {
              console.log("Your order has been submitted successfully!");
              var totalCost = (
                parseInt(answer.order_qty) * order.price
              ).toFixed(2);
              console.log("Your total purchase price is $" + totalCost);
              console.log("");
              continueShopping();
            }
          );
        } else {
          console.log(
            "Woops! You have not entered a valid number of units to purchase. Please revise your order."
          );
          console.log("");
          purchase();
        }
      });
  });
}
function continueShopping() {
  inquirer
    .prompt({
      name: "continue",
      type: "list",
      message: "Would you like to continue shopping?",
      choices: ["Yes", "No"]
    })
    .then(function(answer) {
      if (answer.continue == "Yes") {
        start();
      } else {
        console.log(
          "Thank you for shopping with us! Your order will arrive in 3-5 Years lol."
        );
        console.log(`
            ********** **      **     **     ****     ** **   **       **    **   *******   **     **
            /////**/// /**     /**    ****   /**/**   /**/**  **       //**  **   **/////** /**    /**
                /**    /**     /**   **//**  /**//**  /**/** **         //****   **     //**/**    /**
                /**    /**********  **  //** /** //** /**/****           //**   /**      /**/**    /**
                /**    /**//////** **********/**  //**/**/**/**           /**   /**      /**/**    /**
                /**    /**     /**/**//////**/**   //****/**//**          /**   //**     ** /**    /**
                /**    /**     /**/**     /**/**    //***/** //**         /**    //*******  //******* 
                //     //      // //      // //      /// //   //          //      ///////    ///////  
            
        `);
        connection.end();
      }
    });
}
