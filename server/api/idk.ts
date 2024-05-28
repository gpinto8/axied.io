import Web3 from 'web3';
import axios from 'axios';

export default defineEventHandler(async event => {
  const options: any = {
    headers: [{ name: 'x-api-key', value: 'DaNWKO5aUOHukET6EWvC3Y1j6LPCOwdu' }],
  };

  const web3Provider = new Web3.providers.HttpProvider('https://api.roninchain.com/rpc', options);
  const web3 = new Web3(web3Provider);
  // console.log({ web3 });

  const address = '0x93f4a391c689cdcffce386c08f03486942b7ad49';

  const transactionTotal = web3.eth.getTransactionCount(address);

  const latestBlock = await web3.eth.getBlockNumber();
  const block = await web3.eth.getBlock(latestBlock, true);

  async function getTransactionsByAddress(address: string) {
    // const latestBlockNumber = await web3.eth.getBlockNumber();
    // console.log({ latestBlockNumber: latestBlockNumber.toString() });
    const transactions: any = [];

    for (let i = 0; i <= 10; i++) {
      const block = await web3.eth.getBlock(i, true);

      if (block && block.transactions) {
        block.transactions.forEach((tx: any) => {
          if (tx.from === address || tx.to === address) {
            transactions.push(tx);
          }
        });
      }
    }

    return transactions;
  }

  // Call the function and log the transactions
  await getTransactionsByAddress(address)
    .then(transactions => {
      console.log(`Found ${transactions.length} transactions for address ${address}:`);
      console.log(transactions);
    })
    .catch(err => {
      console.error('Error fetching transactions:', err);
    });

  // console.log('------------', (await transactionTotal).toString());

  // if (block && block.transactions) {
  //   block.transactions.forEach(tx => {
  //     if (tx.from === address || tx.to === address) {
  //       console.log(`Transaction hash: ${tx.hash}`);
  //     }
  //   });
  // }
  // let hola: any;
  // for (let i = 0; i <= latestBlock; i++) {
  //   const block = await web3.eth.getBlock(i, true);
  //   if (block && block.transactions) {
  //     hola = block.transactions.map((tx: any) => {
  //       if (tx.from === address || tx.to === address) {
  //         return tx;
  //         // console.log("i", i)
  //       }
  //     });
  //   }
  // }
  return web3.eth;

  // const RONIN_NODE_URL = 'https://api.roninchain.com/rpc'; // Example RPC URL
  // const RONIN_API_URL = 'https://explorer.roninchain.com/api'; // Example API URL

  // const web3 = new Web3(new Web3.providers.HttpProvider(RONIN_NODE_URL));
  // const txCountResponse = await axios.get(`${RONIN_API_URL}/address/ronin:0x93f4a391c689cdcffce386c08f03486942b7ad49/transactions`);
  // console.log('-------------------', txCountResponse);
  // return { txCountResponse };
  // console.log({ web3 });
  // const getTransactions = async (address: string) => {
  //   try {
  //     // Fetch the total number of transactions
  //     const txCountResponse = await axios.get(`${RONIN_API_URL}/address/${address}/transactions`);
  //     console.log({ txCountResponse });
  //     const txCount = txCountResponse.data.total;

  //     console.log(`Total transactions for ${address}: ${txCount}`);

  //     const transactions = [];
  //     const pageSize = 50; // Adjust based on API limitations
  //     let currentPage = 0;

  //     // Fetch all transactions using pagination
  //     while (transactions.length < txCount) {
  //       const response = await axios.get(`${RONIN_API_URL}/address/${address}/transactions`, {
  //         params: {
  //           page: currentPage,
  //           size: pageSize,
  //         },
  //       });
  //       transactions.push(...response.data.results);
  //       currentPage++;
  //     }

  //     return transactions;
  //   } catch (error) {
  //     console.error('Error fetching transactions:', error);
  //     return [];
  //   }
  // };

  // // Replace with the Ronin address you want to query
  // const roninAddress = 'ronin:0x93f4a391c689cdcffce386c08f03486942b7ad49';

  // getTransactions(roninAddress).then(transactions => {
  //   console.log(`Fetched ${transactions.length} transactions`);
  //   console.log(transactions);
  // });
});
