
import networkPkg from '@stacks/network';
const { STACKS_MAINNET } = networkPkg;
import transactionsPkg from '@stacks/transactions';
const {
  makeContractCall,
  broadcastTransaction,
  fetchCallReadOnlyFunction,
  uintCV,
  stringAsciiCV,
  stringUtf8CV,
  standardPrincipalCV,
  cvToValue
} = transactionsPkg;

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import walletPkg from '@stacks/wallet-sdk';
const { generateWallet } = walletPkg;

// Load env vars
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const MNEMONIC = process.env.DEPLOYER_MNEMONIC;
if (!MNEMONIC) {
  console.error("DEPLOYER_MNEMONIC not found in .env.local");
  process.exit(1);
}

const NETWORK = STACKS_MAINNET;
const DEPLOYER_ADDRESS = 'SP2QNSNKR3NRDWNTX0Q7R4T8WGBJ8RE8RA516AKZP';

// Helper to get random int
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Actions
const actions = [
  // 1. Check Reputation (Read-only)
  async () => {
    console.log("Action: Checking reputation...");
    const result = await fetchCallReadOnlyFunction({
      contractAddress: DEPLOYER_ADDRESS,
      contractName: 'reputation-system-v2',
      functionName: 'get-reputation-score',
      functionArgs: [standardPrincipalCV(DEPLOYER_ADDRESS)],
      network: NETWORK,
      senderAddress: DEPLOYER_ADDRESS
    });
    console.log("Reputation Score:", cvToValue(result));
  },

  // 2. Initialize Reputation (Transaction)
  async (privateKey) => {
    console.log("Action: Initializing reputation...");
    // This might fail if already initialized, but that's fine for "activity"
    const txOptions = {
      contractAddress: DEPLOYER_ADDRESS,
      contractName: 'reputation-system-v2',
      functionName: 'initialize-reputation',
      functionArgs: [],
      senderKey: privateKey,
      validateWithAbi: true,
      network: NETWORK,
      anchorMode: 1,
    };
    try {
      const transaction = await makeContractCall(txOptions);
      const broadcastResponse = await broadcastTransaction({ transaction, network: NETWORK });
      console.log("Tx Broadcast:", broadcastResponse.txid);
    } catch (e) {
      console.log("Tx failed (expected if already initialized):", e.message);
    }
  },

  // 3. Get User Stats (Read-only)
  async () => {
    console.log("Action: Checking user stats...");
    const result = await fetchCallReadOnlyFunction({
      contractAddress: DEPLOYER_ADDRESS,
      contractName: 'bittrust-core-v2',
      functionName: 'get-user-stats',
      functionArgs: [standardPrincipalCV(DEPLOYER_ADDRESS)],
      network: NETWORK,
      senderAddress: DEPLOYER_ADDRESS
    });
    console.log("User Stats:", cvToValue(result));
  },

  // 4. Create Dummy Proposal (Transaction)
  async (privateKey) => {
    console.log("Action: Creating governance proposal...");
    const title = `Prop #${randomInt(1, 9999)}`;
    console.log("Network type:", typeof NETWORK, "ChainId:", NETWORK?.chainId);
    
    const txOptions = {
      contractAddress: DEPLOYER_ADDRESS,
      contractName: 'governance-v2',
      functionName: 'create-proposal',
      functionArgs: [
        stringAsciiCV(title),
        stringUtf8CV("Random automated proposal"),
        stringAsciiCV("platform-fee"),
        uintCV(randomInt(100, 500))
      ],
      senderKey: privateKey,
      network: NETWORK,
      anchorMode: 1, // AnchorMode.Any
    };
    try {
      console.log("Making contract call...");
      const transaction = await makeContractCall(txOptions);
      console.log("Transaction created. Keys:", Object.keys(transaction));
      console.log("Has serialize:", typeof transaction.serialize);
      
      console.log("Broadcasting...");
      const broadcastResponse = await broadcastTransaction({ transaction, network: NETWORK });
      console.log("Tx Broadcast:", broadcastResponse.txid);
    } catch (e) {
      console.log("Tx failed:", e.message);
      console.error(e);
    }
  }
];

async function main() {
  console.log("🤖 Random Activity Bot Started");
  console.log(`Target: ${DEPLOYER_ADDRESS}`);

  // Derive private key
  const wallet = await generateWallet({ secretKey: MNEMONIC, password: '' });
  const privateKey = wallet.accounts[0].stxPrivateKey;
  console.log("Wallet loaded.");
 
  const maxActions = Number(process.env.MAX_ACTIONS ?? '0'); // 0 = unlimited
  let executed = 0;
  while (maxActions === 0 || executed < maxActions) {
    // Pick random action
    const action = actions[Math.floor(Math.random() * actions.length)];
    
    try {
      await action(privateKey);
    } catch (e) {
      console.error("Action execution error:", e);
    }

    executed++;
    // Wait 1-10 minutes
    const delayMinutes = randomInt(1, 10);
    const delayMs = delayMinutes * 60 * 1000;
    console.log(`Waiting ${delayMinutes} minutes (${new Date().toLocaleTimeString()} + ${delayMinutes}m)...`);
    
    await new Promise(r => setTimeout(r, delayMs));
  }
  console.log(`Completed ${executed} action(s). Exiting.`);
}

main().catch(console.error);
