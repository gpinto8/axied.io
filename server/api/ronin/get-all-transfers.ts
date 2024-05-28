import Web3, { type TransactionReceipt } from 'web3';

type TransferChunk = {
  data: TransactionReceipt[];
  total: number;
};

export default defineEventHandler(async event => {
  const { address } = getQuery(event);

  const CHUNK_LIMIT = 100;

  const getTransfersChunk = async (offset: number): Promise<TransferChunk> => {
    const RONIN_TRANSFERS_URL = 'https://skynet-api.roninchain.com/ronin/tokens/transfers/search';

    const body = {
      paging: {
        offset, // This offset is the number of items to skip (not the index, so e.g from 100 till the "limit")
        limit: CHUNK_LIMIT,
      },
      address: { relateTo: address },
    };

    const transfersData = await fetch(RONIN_TRANSFERS_URL, { method: 'POST', body: JSON.stringify(body) });
    const {
      result: {
        items: data,
        paging: { total },
      },
    } = await transfersData.json();

    return { data, total };
  };

  // 1. First get the initial chunk of transactions
  const { data, total } = await getTransfersChunk(0);
  let allData = data;

  // 2. If there are more transactions, get the rest of them
  if (total > CHUNK_LIMIT) {
    const remainingChunks = Math.ceil((total - CHUNK_LIMIT) / CHUNK_LIMIT);

    const promises = Array.from(
      { length: remainingChunks + 1 }, // Here we add 1 to start from the offset "1" to X (since we've already used "0" before)
      (_, i) =>
        i !== 0 && // Here we skip the first iteration since we've already fetched the first chunk
        getTransfersChunk(i * CHUNK_LIMIT) // Here we multiply the offset by the limit to get the next chunk, since it skips the ITEMS not the "index" (as if it were some pagination and shit)
    ).filter(Boolean); // Here we just filter out the first iteration ("i !== 0")

    const chunks = await Promise.all(promises);

    // 3. Concatenate all the chunks
    allData = chunks.reduce((acc, chunk) => [...acc, ...(chunk as TransferChunk).data], data);
  }

  return allData;
});
