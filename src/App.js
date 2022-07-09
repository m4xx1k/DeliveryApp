import styles from './App.module.scss';
import Header from "./components/Header/Header";
import {Routes, Route} from 'react-router-dom'
import Shops from "./pages/Shops/Shops";
import Cart from "./pages/Cart/Cart";
import History from "./pages/History/History";

function App() {
    return (
        <div className={styles.App}>
            <Header/>
            <Routes>
                <Route path="/" element={<Shops/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/history" element={<History/>}/>
            </Routes>
        </div>
    );
}

export default App;
