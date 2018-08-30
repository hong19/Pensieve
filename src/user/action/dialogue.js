const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const {verify_key} = require('../../../config/jwt.js');
const {connection_key} = require('../../../config/database.js');

const database = mysql.createPool(connection_key);


function _handler_err_BadReq(err, res){
  let resData = {};
  resData['error'] = 1;
  resData['message'] = 'Error Occured: bad database query';
  res.status(400).json(resData);
 }

function _handler_err_Unauthorized(err, res){
  let resData = {};
  resData['error'] = 1;
  resData['message'] = "Token is invalid";
  res.status(401).json(resData);
}

function _handler_err_Internal(err, res){
  let resData = {};
  resData['error'] = 1;
  resData['message'] = 'Error Occured: Internal Server Error';
  res.status(500).json(resData);
}

function _handle_action_newDialogue(req, res){
  jwt.verify(req.headers['token'], verify_key, function(err, payload) {
    if (err) {
      _handler_err_Unauthorized(err, res)
    } else {
      let userId = payload.user_Id;
      database.getConnection(function(err, connection){
        if (err) {
          _handler_err_Internal(err, res);
          console.log("error occured when getConnection in actionDialogue handler.")
        }else{
          new Promise((resolve, reject)=>{
            console.log('action post: Dialogue aim to new');
            connection.query('SELECT * FROM threads WHERE id = ?', [req.body.threadId], function(err, rows, fields) {
              if (err) {_handler_err_Internal(err, res);reject(err);}
              console.log('database connection: success.')
              resolve(rows)
            })
          }).then((rows)=>{
            return new Promise((resolve, reject)=>{
              console.log('action post: Dialogue aim to new, manage threadify.');
              if(rows.length>0){
                resolve(req.body.threadId)
              }else{
                connection.query('INSERT INTO threads (id_mark, id_participant) VALUES ?', [[[req.body.markId, userId]]], function(err, result, fields){
                  if (err) {_handler_err_Internal(err, res);reject(err);}
                  console.log('database connection: success.')
                  resolve(result.insertId);
                })
              }
            })
          }).then((threadId)=>{
            return new Promise((resolve, reject)=>{
              console.log('action post: Dialogue aim to new, insert dialogue.');
              connection.query('INSERT INTO dialogues (id_thread, id_talker, editor_content) VALUES ?', [[[threadId, userId, req.body.editorContent]]], function(err, result, fields) {
                if (err) {_handler_err_Internal(err, res);reject(err);}
                console.log('database connection: success.')
                resolve(threadId)
              })
            })
          }).then((threadId)=>{
            let resData = {};
            resData['error'] = 0;
            resData['message'] = 'post req completed!';
            resData['main'] = {threadId: threadId};
            res.status(200).json(resData);
            connection.release();
          }).catch((err)=>{
            console.log("error occured in actionInspired promise: "+err)
            connection.release();
          });
        }
      })
    }
  })
}

module.exports = _handle_action_newDialogue