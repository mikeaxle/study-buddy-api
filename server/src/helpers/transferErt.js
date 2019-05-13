'use strict';

var amqp = require('amqplib/callback_api');

const transferErt = async (tx) => {
  let _tx = JSON.stringify(tx);
  let success
  try {
    // crete connection to rabbitmq and sent message
    await amqp.connect('amqp://hcgxmtfu:nf9Nu-SRihfotW_GUov49SlylZbapDn5@crane.rmq.cloudamqp.com/hcgxmtfu', function (err, conn) {
      // create channel
      conn.createChannel(function (err, ch) {

        // create queue
        let q = 'txs';
        ch.assertQueue(q, {
          durable: true,
        });

        // send to queue
        ch.sendToQueue(q, new Buffer(_tx), {
          persistent: true,
        });

        console.log(`[x] Sent to tx queue: ${tx.amount}ERT from ${tx.from} to ${tx.to}`);
      success = true;
      });

      // close connection
      setTimeout(function () {
        conn.close();
      }, 500);
    });
  } catch (error) {
    console.log(error);
    success = false
    return success;
  }
  return success
}

module.exports = transferErt;
