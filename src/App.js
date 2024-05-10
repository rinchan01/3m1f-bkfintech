import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import NFTs from './page/NFTs';
import Pool from './page/Pool';
import Explore from './page/Explore';
import Layout from './page/Layout';
import AddPosition from './page/position/AddPosition';
const path = [
  { path: '/', component: <Home/>},
  { path: '/home', component: <Home/>},
  { path: '/nft', component: <NFTs/>},
  { path: '/pool', component: <Pool/>},
  { path: '/explore', component: <Explore/>},
  { path: '/add', component: <AddPosition/>}
]
function App() {
  return (
      <Routes>
        <Route path='/' element={<Layout/>}>
          {path.map((route) =>
            <Route key={route.path} path={route.path} element={route.component} />        
          )}
        </Route>
      </Routes>  

  );
}

export default App;
