import './App.css';
import {ethers} from 'ethers'
import usePromise from 'react-use-promise'

// eslint-disable-next-line
const reloadPage = () => location.reload();

function App() {
  const [data, error] = usePromise(
    async () => {
      // Initialize metamask provider
      await window.ethereum.enable()

      // Reload the page in case metamask changes
      window.ethereum.on('accountsChanged', reloadPage);
      window.ethereum.on('chainChanged', reloadPage);
      window.ethereum.on('disconnect', reloadPage);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      return {
        account: await signer.getAddress(),
        balance: await (await signer.getBalance()).toString(),
        chain: await signer.getChainId(),
      }
    },
    []
  );

  return (
    <div className="App App-container">
      <h1>Ethereum demo</h1>
      <p style={{color: 'red'}}>{error && "Error getting data. Is metamask extension installed?"}</p>
      <p>{!data && 'loading...'}</p>
      {!!data && (
        <>
          <p>Account: {data.account}</p>
          <p>Balance: {data.balance}</p>
          <p>ChainId: {data.chain}</p>
        </>
      )}
    </div>
  );
}

export default App;
