
import { StacksMainnet } from '@stacks/network';

export const NETWORK = new StacksMainnet();
export const DEPLOYER_ADDRESS = 'SP2QNSNKR3NRDWNTX0Q7R4T8WGBJ8RE8RA516AKZP';

export const CONTRACTS = {
    CORE: 'bittrust-core',
    REPUTATION: 'reputation-system',
    GOVERNANCE: 'governance',
    FLASH_LOANS: 'flash-loans',
    POOLS: 'liquidity-pool',
    NFT_COLLATERAL: 'nft-collateral',
    CREDIT_DELEGATION: 'credit-delegation',
} as const;

export const getContractId = (name: keyof typeof CONTRACTS) => {
    return `${DEPLOYER_ADDRESS}.${CONTRACTS[name]}`;
};

export const MOCK_NFTS = [
    { id: 1, name: 'Bitcoin Monkey #1234', floor: 1500, image: 'https://images.gamma.io/ipfs/QmXY...' },
    { id: 2, name: 'Stacks Punk #5678', floor: 2500, image: 'https://images.gamma.io/ipfs/QmAB...' },
];
