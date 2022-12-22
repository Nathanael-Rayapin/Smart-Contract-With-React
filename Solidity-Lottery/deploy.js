import * as dotenv from 'dotenv'
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from 'web3';
import module from './compile.js';
dotenv.config()

// Connect the Provider with my Meta Wallet
const provider = new HDWalletProvider(
    process.env.SECRET_WORDS,
    process.env.GOERLI_LINK
);

// Open the portal to the Web3
const web3 = new Web3(provider);

// Deploy the Contract
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(module.abi)
    .deploy({ data: module.evm.bytecode.object })
    .send({ gas: 1000000, from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
    console.log(JSON.stringify(module.abi));
    provider.engine.stop();
};
deploy();