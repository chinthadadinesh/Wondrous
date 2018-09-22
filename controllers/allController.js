var db = require('../db');
var bcrypt = require('bcryptjs');
var sanitizer = require('sanitizer');

// add users
exports.adduser = async (req, res) => {
    let name = await sanitizer.escape(req.body.name);
    let email = await sanitizer.escape(req.body.email);
    let password = await sanitizer.escape(req.body.password);

    db.connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, resl) {
        if (resl.length > 0) {
            res.send({
                "code": 406,
            })
        }
        else {
            if ((name && email && password) !== "") {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        db.connection.query(
                            "INSERT INTO users (name, email, password) VALUE (?,?,?)",
                            [name, email, hash], function (error, results) {
                                if (error) {
                                     res.send({
                                        "code": 400,
                                        "failed": "error ocurred"
                                    })
                                }
                                else {
                                    res.send({
                                        "code": 200,
                                        "message": "Registaration successfully"
                                    })

                                }
                            });
                    });
                });
            }

        }
    })
};
//login user
exports.userlogin = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    db.connection.query("select * from users where email=?", [email], function (err, rows) {
        if (rows.length <= 0) {
            res.send({
                "code": 406,
                "message": "email not registered"
            })
        }
        else {

            let hash = rows[0].password
            bcrypt.compare(req.body.password, hash, function (err, resl) {
                if (resl) {
                    res.send({
                        "code": 200,
                        "rows": rows[0]
                    })
                }
                else {
                    res.send({
                        "code": 402,
                        "rows": "error in password"
                    })
                }
            })

        }
    })
}
exports.getallposts = async (req, res) => {
  
    db.connection.query("select * from posts Inner join users on users.userId=posts.userId  INNER JOIN cities on cities.city_id=posts.city order by votes desc", function (err, rows) {
      if(rows.length !=0){
        res.send({
            code:200,
            rows:rows
        })
      }
      else{
        res.send({
            code:400,
            rows:[]
        })
      }
    })
}
exports.getmyposts = async (req, res) => {
    var id=req.params.id
  
    db.connection.query("select * from posts Inner join users on users.userId=posts.userId  INNER JOIN cities on cities.city_id=posts.city where users.userId=? order by votes desc", [id],function (err, rows) {
      if(rows.length !=0){
        res.send({
            code:200,
            rows:rows
        })
      }
      else{
        res.send({
            code:400,
            rows:[]
        })
      }
    })
}
exports.getcities = async (req, res) => {
  
    db.connection.query("select * from Cities", function (err, rows) {
      if(rows.length !=0){
        res.send({
            code:200,
            rows:rows
        })
      }
      else{
        res.send({
            code:400,
            rows:[]
        })
      }
    })
}

 exports.adddata= async(req,res)=> {
    let data = req.body;
    let table = data.table;
    delete data.table;
     console.log(data)
    let sql = "INSERT INTO ";
    sql = sql + table + "(";
    let iterator = 0;
    let dataArray = [];
    let values = "VALUES(";
    for (const key in data) {
        
        if (data.hasOwnProperty(key)) {
            iterator++;
            console.log(iterator,Object.keys(data).length)
            if(iterator == Object.keys(data).length) {
                sql = sql + key + ") ";
                values = values + "?)";
            } else {
                sql = sql + key + ",";
                values = values + "?,";
            }
            dataArray.push(data[key]);
        }
    }
    sql = sql + values;
    console.log(sql)
    
    db.connection.query(sql, dataArray, function (err, rows) {
        if (!err) {
            res.send({
                code: 200,
                "rows": rows
            })
        } else {
            res.send({
                code: 400,
                "rows": rows
            })
        }
    });
};
exports.update= async(req,res)=>{
    let data = req.body;
    let table = data.table;
    let updatename=data.updatename
    let updatevalue=data.updatevalue
    delete data.table;
    delete data.updatename
    delete data.updatevalue
    let update="where "+updatename+"=? "
    let sql = "update " + table+ " set ";
    let iterator = 0;
    let dataArray = [];
    for (const key in data) {
        
        if (data.hasOwnProperty(key)) {
            iterator++;
         
            if(iterator == Object.keys(data).length) {
                sql = sql + key + "=? "  ;
                
            } else {
                sql = sql + key + "=?, ";
               
            }
            dataArray.push(data[key]);
        }
    }
    sql=sql+update
    dataArray.push(updatevalue)
    console.log(sql,dataArray)
        db.connection.query(sql,dataArray, function(err, rows) {
            if (!err                                                                                                                                                                                                                                                                                                                                ){
                res.send({
                    code:200,
                   "rows":rows
                })
            }
            else{
                res.send({
                    code:400,
                  "rows":rows
                })
            }
        });   
     };
     exports.select= async(req,res)=>{
        let data =req.body
        let table=data.table
        let where=data.where
        let wherevalue=[]
        let sql="select * from "+table
        if( where )
        {
            sql=sql+" where "+where+"=?";
            wherevalue.push(data.wherevalue)
        }
        console.log(sql,wherevalue)
            db.connection.query(sql,wherevalue, function(err, rows) {
                if (!err){
                    res.send({
                        code:200,
                       "rows":rows
                    })
                }
                else{
                    res.send({
                        code:400,
                      "rows":rows
                    })
                }
            });
         };
         exports.addvote = async (req, res) => {
            let id = await sanitizer.escape(req.params.id);
            db.connection.query('update posts set votes=votes+? where postId=?', [1,id], function (error, resl) {
                if (error) {
                    res.send({
                        "code": 400,
                    })
                }
                else {
                    res.send({
                        "code": 200,

                    })
                }
            })
        };