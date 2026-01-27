
import { STACKS_MAINNET } from '@stacks/network';

export const NETWORK = STACKS_MAINNET;
export const DEPLOYER_ADDRESS = 'SP2QNSNKR3NRDWNTX0Q7R4T8WGBJ8RE8RA516AKZP';

export const CONTRACTS = {
    CORE: 'bittrust-core-v2',
    REPUTATION: 'reputation-system-v2',
    GOVERNANCE: 'governance-v2',
    FLASH_LOANS: 'flash-loans-v2',
    POOLS: 'liquidity-pool-v2',
    NFT_COLLATERAL: 'nft-collateral-v2',
    CREDIT_DELEGATION: 'credit-delegation-v2',
} as const;

export const getContractId = (name: keyof typeof CONTRACTS) => {
    return `${DEPLOYER_ADDRESS}.${CONTRACTS[name]}`;
};

export const MOCK_NFTS = [
    { id: 1, name: 'Bitcoin Monkey #1234', floor: 1500, image: 'https://images.gamma.io/ipfs/QmXY...' },
    { id: 2, name: 'Stacks Punk #5678', floor: 2500, image: 'https://images.gamma.io/ipfs/QmAB...' },
];
