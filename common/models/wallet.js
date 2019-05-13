// 'use strict';
// var amqp = require('amqplib/callback_api');
let transferErt = require('../../server/src/helpers/transferErt')
 
// ERT API URL
const ertApiUrl = 'http://3.18.80.117';

// Transaction Publisher details, ideally, should be an array loaded from database and publishers should be picked at random
const txPub = {
  fee: 0.1,
  address: '0x9792f018Be90d0eAF7B06B9400D9D0Ba7e590a5F',
  privateKey: '4E9B3E0165DF4D7CAC9A68C2CDAFEB8FA8B39F60ED4D72A1A8CC47416BA54E2E'
}


module.exports = function (Wallet) {
  /**
   * @description Remote method to get ert transaction list for specified account
   */
  Wallet.transactionList = async (address) => {
    // get transaction list from ert api
    let res = await fetch(`${ertApiUrl}/transactionList/${address}`);
    let res_2 = await res.json();
    let transactionList = await res_2.result
    return transactionList
  };

  Wallet.remoteMethod(
    'transactionList', {
      http: {
        path: '/transactionlist',
        verb: 'get',
      },
      accepts: {
        arg: 'address',
        type: 'string',
        required: true,
        http: {
          source: 'query',
        },
      },
      returns: {
        arg: 'txs',
        type: 'object',
      },
    }
  );

  /**
   * @description Remote method to get ert balance from Ethereum blockchain for specified account
   */
  Wallet.balanceOf = async (address) => {
    // get balance from ert api
    try {
      let balance = await getBalance(address);
      return balance;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  Wallet.remoteMethod(
    'balanceOf', {
      http: {
        path: '/balanceof',
        verb: 'get',
      },
      accepts: {
        arg: 'address',
        type: 'string',
        required: true,
        http: {
          source: 'query',
        },
      },
      returns: {
        arg: 'balance',
        type: 'string',
      },
    }
  );

  /**
   * @description Remote method to transfer ert from one address to another, using a transaction publisher
   *              the sender does not need to have any ETH in their wallet to do this, tx fees are paid in ert
   */
  Wallet.sendertViaSignature = async (tx) => {
    // add tx publisher details to tx
    tx.fee = txPub.fee
    tx.feeRecipient = txPub.address
    tx.privateKey = txPub.privateKey

    let success = await transferErt(tx)
    console.log(success)
    return success
  };

  Wallet.remoteMethod(
    'sendertViaSignature', {
      http: {
        path: '/sendertViaSignature',
        verb: 'post',
      },
      accepts: {
        arg: 'tx',
        type: 'object',
        required: true,
        http: {
          source: 'body',
        },
      },
      returns: {
        arg: 'success',
        type: 'boolean',
      },
    }
  );


  /**
   * @description Remote method to transfer ert from one address to another
   */
  Wallet.sendert = async (tx) => {
    let success = await transferErt(tx)
    return success
  };

  Wallet.remoteMethod(
    'sendert', {
      http: {
        path: '/sendert',
        verb: 'post',
      },
      accepts: {
        arg: 'tx',
        type: 'object',
        required: true,
        http: {
          source: 'body',
        },
      },
      returns: {
        arg: 'success',
        type: 'boolean',
      },
    }
  );


  /**
   * @description Operation hook to update the wallet balance every time a wallet isntance is called
   */
  Wallet.observe('loaded', (ctx, next) => {
    // get ert balance from ethereum 
    getBalance(ctx.data.walletAddress)
      .then(balance => {
        // update balance;
        ctx.data.actualBalance = balance ? balance : 0;
        // console.log(ctx.data)
        next();
      })
      .catch(err => {
        console.log(err);
      });
  });
};

async function getBalance(address) {
  const res = await fetch(`${ertApiUrl}/balanceOf/${address}`);
  const res_1 = await res.text();
  return (res_1);
}
