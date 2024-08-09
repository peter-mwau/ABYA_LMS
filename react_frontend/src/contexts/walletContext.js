import { createContext } from 'react';

const WalletContext = createContext({
    account: null,
    balance: null,
    isWalletConnected: false,
    connectWallet: () => {},
    disconnectWallet: () => {},
});

export default WalletContext;
