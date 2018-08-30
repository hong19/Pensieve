const express = require('express');
const execute = express.Router();

const {_promise_unitMount} = require('./mount.js');
const _handle_unit_markDialogue = require('./dialogue.js');

execute.get('/mount', function(req, res){
  console.log('get unit request: '+ req.query.unitName);
  _promise_unitMount(req, res);
})

execute.get('/dialogue', function(req, res){
  console.log('get dialogue request');
  _handle_unit_markDialogue(req, res);
})

module.exports = execute;