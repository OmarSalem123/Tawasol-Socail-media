import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import './App.css';
import Navbar from './components/Nav';
import Landing from './components/Landing';
import store from './redux/store';
import { Provider } from 'react-redux';
import Register from './components/Users/register';
import { transitions, positions,  Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alert from "./components/Alert";
import Login from './components/Users/Login';

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "30px",
  transitions: transitions.FADE
};


function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <Fragment>
          <Alert/>
          <Navbar/>
          <Routes>
            <Route exact path='/' element={<Landing/>} />
            <Route exact path='/register' element={<Register/>} />
            <Route exact path='/login' element={<Login/>} />
          </Routes>
        </Fragment>
      </AlertProvider>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
