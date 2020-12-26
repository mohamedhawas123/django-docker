import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import ButtonAppBar from './components/Navbar'

function App() {
  return (
    <div className="App">
     <Router>
       <ButtonAppBar />
       <switch>
        <Route exact path="/" component={Home} />
        <Route exact  path="/signup" component={Signup} />
       <Route exact  path="/login" component={Login} />
       
       </switch>
      
     </Router>
    </div>
  );
}

export default App;
