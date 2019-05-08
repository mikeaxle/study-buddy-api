// 'use strict';

// var r = require('../node_modules/loopback-connector-rethinkdb/node_modules/rethinkdb');

// var dataSources = require('../server/dataSources');
// var db = dataSources.rethinkdb;

// // get sample data json
// var sampleData = require('./sampledata.json');

// r.connect({
//   host: db.host,
//   port: db.port,
// }, function(err, conn) {
//   if (err) throw err;
//   // create course table
//   r.db('studybuddy').tableCreate('course').run(conn, (err, result) => {
//     if (err) throw err;
//     console.log(JSON.stringify(result, null, 2));
//   });
// //   r.table('customer').insert(sampleData).run(conn, (err, result) => {
// //     if (err) throw err;
// //     console.log(JSON.stringify(result, null, 2));
// //   });


//   r.db('studybuddy').tableCreate('institution').run(conn, (err, result) => {
//     if (err) throw err;
//     console.log(JSON.stringify(result, null, 2));
//   });

//   r.db('studybuddy').tableCreate('module').run(conn, (err, result) => {
//     if (err) throw err;
//     console.log(JSON.stringify(result, null, 2));
//   });

//   r.db('studybuddy').tableCreate('question').run(conn, (err, result) => {
//     if (err) throw err;
//     console.log(JSON.stringify(result, null, 2));
//   });

//   r.db('studybuddy').tableCreate('section').run(conn, (err, result) => {
//     if (err) throw err;
//     console.log(JSON.stringify(result, null, 2));
//   });

//   conn.close((err) => {
//     if (err) throw err;
//   });
// });
