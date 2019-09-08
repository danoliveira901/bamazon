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
        // push data to table
        table.push([res[i].item_id, res[i].product_name, res[i].price]);
      }
      console.log(table.toString());
      console.log(
        "----------------------------------------------------------------------------------------------------"
      );
      
    }
  );
}
