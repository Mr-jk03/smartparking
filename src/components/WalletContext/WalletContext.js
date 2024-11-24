import React, {createContext, useState} from "react";
export const WalletContext = createContext();
export const WalletProvider = ({ children }) =>{
    const [walletBalance, setWalletBalance] = useState(null);

    const updateWalletBalance = (balance) =>{
        setWalletBalance(balance);
    };

    return(
        <WalletContext.Provider value={{walletBalance, updateWalletBalance}}>
            {children}
        </WalletContext.Provider>
    )
} 