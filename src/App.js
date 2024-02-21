import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
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
import Private from './components/Private';
import Home from './components/Home';
import ProfileForm from './components/ProfileForms/ProfileForm';
import AddEdu from './components/ProfileForms/AddEdu';
import AddExp from './components/ProfileForms/AddExp';
import { setAuthToken } from './utils';
import { loadUser } from './redux/modules/users';

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "30px",
  transitions: transitions.FADE
};


function App() {
  useEffect(() => {
    if(localStorage.token){
      setAuthToken(localStorage.token)
    }
    store.dispatch(loadUser())
  }, [])
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
            <Route exact path='/home' element={<Private component={Home}/>} />
            <Route exact path='/create-profile' element={<Private component={ProfileForm}/>} />
            <Route exact path='/add-edu' element={<Private component={AddEdu}/>} />
            <Route exact path='/add-exp' element={<Private component={AddExp}/>} />
          </Routes>
        </Fragment>
      </AlertProvider>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
