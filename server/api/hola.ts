import { Web3 } from 'web3';

export default defineEventHandler(event => {
  const web3 = new Web3('https://api.roninchain.com/rpc');
  // console.log({ web3 });

  const getTransactionsByAddress = async (address: string) => {
    const latest = await web3.eth.getBlockNumber();
    // console.log({ latest });

    for (let i = latest; i >= 0; i--) {
      const block = await web3.eth.getBlock(i, true);
      console.log({ transactions: block.transactions.length });
      if (block && block.transactions) {
        block.transactions.forEach((tx: any) => {
          if (tx.from === address || tx.to === address) {
            console.log('hola', tx);
          }
        });
      }
    }
  };

  const axieOwnerAddress = '0x93f4a391c689cdcffce386c08f03486942b7ad49';
  // console.log({ axieOwnerAddress });
  getTransactionsByAddress(axieOwnerAddress);
  // return 'hola';
});
