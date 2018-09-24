
var mysql = require('mysql2');

var pool = mysql.createPool({
    host     : 'localhost',   
    user     : 'root',   
    // password:''  ,     if password is available.
    database : 'wondrous'
});
     
exports.connection = {                              
    query: function(){
        var sql_args = [];
        var args = [];
        for(var i=0; i<arguments.length; i++){
            args.push(arguments[i]);
        }
        var callback = function(err,data) {
            if(err) {
                console.log(err); 
            }
        }
        if(typeof(args[args.length-1])=='function'){
             callback = args[args.length-1];
        }
         //last arg is callback
        pool.getConnection(function(err, connection) {
            if(err) {
                console.log(err);
                return callback(err);
            }
            if(args.length > 1){
                if(typeof(args[1])=='function') {
                    sql_args = [];
                } else {
                    sql_args = args[1];
                }
            }
            connection.query(args[0], sql_args, function(err, results) {
                connection.release(); // always put connection back in pool after last query
                if(err){
                        console.log(err);
                        return callback(err);
                    }
                callback(null, results);  
            });
        });
    }
};


