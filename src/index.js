// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import rootReducer from './redux/rootReducer';
// import { createWeb3Modal } from '@web3modal/wagmi/react'
// import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

// import { WagmiProvider } from 'wagmi'
// import { mainnet} from 'wagmi/chains'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// // 0. Setup queryClient
// const queryClient = new QueryClient()

// // 1. Get projectId at https://cloud.walletconnect.com
// const projectId = '9fc34c366fac8761873d66dc3a7c5ff4'

// // 2. Create wagmiConfig
// const metadata = {
//   name: 'Web3Modal',
//   description: 'Web3Modal Example',
//   url: 'https://web3modal.com', // origin must match your domain & subdomain
//   icons: ['https://avatars.githubusercontent.com/u/37784886']
// }

// const chains = [mainnet]
// const config = defaultWagmiConfig({
//   chains,
//   projectId,
//   metadata,
// })

// // 3. Create modal
// createWeb3Modal({
//   wagmiConfig: config,
//   projectId,
//   enableAnalytics: true, // Optional - defaults to your Cloud configuration
//   enableOnramp: true // Optional - false as default
// })

// const store = createStore(rootReducer);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <WagmiProvider config={config}>
//     <Provider store={store}>
//       <Router>
//         <QueryClientProvider client={queryClient}>
//             <App />
//         </QueryClientProvider>
//       </Router>
//     </Provider>
//     </WagmiProvider>
//   </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/rootReducer';


const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>

  </React.StrictMode>
);