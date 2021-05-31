import React, {useState, useEffect} from 'react'

export default function MetaMask() {

    const ethereum = window.ethereum;
    const [account, setAccount] = useState('');
    const [connected, setConnected] = useState(ethereum.isConnected()?'yes':'no');

    if(ethereum){
        ethereum.on('accountsChanged', (accounts) => {
            setAccount(accounts[0]);
        });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setConnected(ethereum.isConnected()?'yes':'no');
            ethereum.request({ method: 'eth_accounts' })
            .then((accounts) => {
                setAccount(accounts[0])
            })
        },1000);
        return () => {
            clearInterval(interval)
        }
    }, [ethereum])

    const connectRequest = event => {
        ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
            setAccount(accounts[0])
        })
        .catch((err) => {
        if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            console.log('Please connect to MetaMask.');
        } else {
            console.error(err);
        }
        });
    }

    return (
        <div>
            <p>MetaMask Available: {connected} </p>
            Your connected account is: {account}
            <p>
            <button onClick={connectRequest}>Connect My Account</button>
            </p>
        </div>
    )
}
