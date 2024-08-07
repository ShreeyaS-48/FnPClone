import Header from './Header';
import Cart from './Cart';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import Cakes from './Cakes';
import Bouquets from './Bouquets';
import Plants from './Plants';
import Chocolates from './Chocolates';
import Combos from './Combos';
import ItemDetails from './ItemDetails';
import LoginPage from './LoginPage';
import { DataProvider } from './context/DataContext';
import{ Routes, Route} from'react-router-dom';
function App() {
  return (
    <div className='App'>
      <DataProvider>
      <Header/>
      <Nav/>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/cart" element={<Cart/>}/>
      <Route exact path="/login" element={<LoginPage/>}/>
      <Route exact path="/cakes" element={<Cakes/>}/>
      <Route exact path="/bouquets" element={<Bouquets/>}/>
      <Route exact path="/plants" element={<Plants/>}/>
      <Route exact path="/chocolates" element={<Chocolates/>}/>
      <Route exact path="/combos" element={<Combos/>}/>
      <Route exact path="/:id" element={<ItemDetails/>}/>
      </Routes>
      <Footer/>
      </DataProvider>
    </div>
  );
}

export default App;
