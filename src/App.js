import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import './App.css';
import Navbar from './components/Nav';
import Landing from './components/Landing';
import store from './redux/store';
import { Provider } from 'react-redux';
import Register from './components/Users/register';


function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Landing/>} />
          <Route exact path='/register' element={<Register/>} />
        </Routes>
      </Fragment>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
