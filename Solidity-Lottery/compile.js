import { resolve } from 'path';
import { readFileSync } from 'fs';
import * as url from 'url';
import solc from 'solc';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Retrieve Lottery.sol & Read it
const lotteryPath = resolve(dirname, 'contracts', 'Lottery.sol');
const source = readFileSync(lotteryPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
      'Lottery.sol': {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

  // Compile the Contract
export default JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'Lottery.sol'
].Lottery;