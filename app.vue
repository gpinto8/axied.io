<script setup lang="ts">
// import Web3 from 'web3';
// import axios from 'axios';
// import type { Transaction, TransactionReceipt, TransactionReceiptBase } from 'web3-types';

const MOCK_RONIN_ADDRESS = '0x93f4a391c689cdcffce386c08f03486942b7ad49';

const { data } = await useFetch('/api/ronin/get-all-transfers', {
  query: { address: MOCK_RONIN_ADDRESS },
  server: true,
});

const allTransactionHashes = data.value?.map(item => item.transactionHash);
console.log({ allTransactionHashes });

// 1. get all transaction hashes
// 2. get all token transfers based on transaction hashes

// const options: any = {
//   headers: [{ name: 'x-api-key', value: 'DaNWKO5aUOHukET6EWvC3Y1j6LPCOwdu' }],
// };

// const web3Provider = new Web3.providers.HttpProvider('https://api.roninchain.com/rpc', options);
// const web3 = new Web3(web3Provider);
// console.log({ web3 });

// // GET TRANSACTIONS BASED ON ADDRESS

// const transfers = await fetch('https://skynet-api.roninchain.com/ronin/tokens/transfers/search', {
//   method: 'POST',
//   body: JSON.stringify({
//     paging: {
//       offset: 0,
//       limit: 100,
//     },
//     address: { relateTo: '0x93f4a391c689cdcffce386c08f03486942b7ad49' },
//   }),
// });

// const data = await transfers.json();
// console.log({ data2: data });
// const allTransactionHashes = data.result?.items?.map((item: TransactionReceipt) => item.transactionHash);
// console.log({ allTransactionHashes });

// const test = await data.result?.items?.find(
//   (item: any) => item.transactionHash === '0x2cefd1a39098e9057dea34bb05066849a8f2f59f04a510ccf2cbc8dc391af717'
// );

// GET TRANSACTIONS BASED ON ADDRESS 2
// TODO: https://docs.skymavis.com/get-started#manage-permissions

// let config1 = {
//   method: 'get',
//   maxBodyLength: Infinity,
//   url: 'https://api-gateway.skymavis.com/skynet/ronin/txs?offset=100',
//   headers: {
//     'Accept': 'application/json',
//     'X-API-KEY': 'DaNWKO5aUOHukET6EWvC3Y1j6LPCOwdu',
//   },
// };

// axios(config1)
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.log(error);
//   });

// GET TOKENS AKA MONEY

// let data1 = JSON.stringify({
//   'transaction_hashes': ['0x2cefd1a39098e9057dea34bb05066849a8f2f59f04a510ccf2cbc8dc391af717'],
// });

// let config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: 'https://api-gateway.skymavis.com/skynet/ronin/tokens/transfers/txs',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'X-API-KEY': 'DaNWKO5aUOHukET6EWvC3Y1j6LPCOwdu',
//   },
//   data: data1,
// };

// axios(config)
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.log(error);
//   });

// const sales = await fetch('https://explorer-kintsugi.roninchain.com/2020/decode/tx/logs', {
//   method: 'POST',
//   mode: 'same-origin',
//   body: JSON.stringify([
//     {
//       'logIndex': 0,
//       'transactionIndex': 0,
//       'blockNumber': 11402340,
//       'data': '0x',
//       'address': '0x32950db2a7164ae833121501c797d79e7b79d74c',
//       'blockHash': '0x185971fa98bb183515e3c068cfa65a1c552cac46ee33cc5f78b118f015966344',
//       'topics': [
//         '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//         '0x00000000000000000000000093f4a391c689cdcffce386c08f03486942b7ad49',
//         '0x000000000000000000000000f3ce02e05861bd05d432412091a39b71bea2ed07',
//         '0x000000000000000000000000000000000000000000000000000000000061f6f0',
//       ],
//       'transactionHash': '0x2cefd1a39098e9057dea34bb05066849a8f2f59f04a510ccf2cbc8dc391af717',
//     },
//     {
//       'logIndex': 1,
//       'transactionIndex': 0,
//       'blockNumber': 11402340,
//       'data': '0x0000000000000000000000000000000000000000000000000004879b1216b000',
//       'address': '0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5',
//       'blockHash': '0x185971fa98bb183515e3c068cfa65a1c552cac46ee33cc5f78b118f015966344',
//       'topics': [
//         '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//         '0x000000000000000000000000f3ce02e05861bd05d432412091a39b71bea2ed07',
//         '0x000000000000000000000000a99cacd1427f493a95b585a5c7989a08c86a616b',
//         '',
//       ],
//       'transactionHash': '0x2cefd1a39098e9057dea34bb05066849a8f2f59f04a510ccf2cbc8dc391af717',
//     },
//     {
//       'logIndex': 2,
//       'transactionIndex': 0,
//       'blockNumber': 11402340,
//       'data': '0x00000000000000000000000000000000000000000000000000660d3c3d2c5000',
//       'address': '0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5',
//       'blockHash': '0x185971fa98bb183515e3c068cfa65a1c552cac46ee33cc5f78b118f015966344',
//       'topics': [
//         '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//         '0x000000000000000000000000f3ce02e05861bd05d432412091a39b71bea2ed07',
//         '0x00000000000000000000000093f4a391c689cdcffce386c08f03486942b7ad49',
//         '',
//       ],
//       'transactionHash': '0x2cefd1a39098e9057dea34bb05066849a8f2f59f04a510ccf2cbc8dc391af717',
//     },
//     {
//       'logIndex': 3,
//       'transactionIndex': 0,
//       'blockNumber': 11402340,
//       'data':
//         '0x00000000000000000000000093f4a391c689cdcffce386c08f03486942b7ad49000000000000000000000000f3ce02e05861bd05d432412091a39b71bea2ed07000000000000000000000000000000000000000000000000000000000040b907000000000000000000000000c99a6a985ed2cac1ef41640596c5a5f9f4e19ef5000000000000000000000000000000000000000000000000006a94d74f430000',
//       'address': '0x213073989821f738a7ba3520c3d31a1f9ad31bbd',
//       'blockHash': '0x185971fa98bb183515e3c068cfa65a1c552cac46ee33cc5f78b118f015966344',
//       'topics': ['0x0c0258cd7f0d9474f62106c6981c027ea54bee0b323ea1991f4caa7e288a5725', '', '', ''],
//       'transactionHash': '0x2cefd1a39098e9057dea34bb05066849a8f2f59f04a510ccf2cbc8dc391af717',
//     },
//   ]),
// });

// console.log({ sales });
// console.log({ test });

// const options: any = {
//   headers: [{ name: 'x-api-key', value: 'DaNWKO5aUOHukET6EWvC3Y1j6LPCOwdu' }],
// };

// const web3Provider = new Web3.providers.HttpProvider('https://api.roninchain.com/rpc', options);
// const web3 = new Web3(web3Provider);

// console.log({ web3 });
</script>

<template>
  <div>
    <NuxtWelcome />
  </div>
</template>
