import { Switch, Route } from 'react-router-dom';

import './App.scss';
import Nav from './components/Nav';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import SignIn from './components/Signin';

function App() {
  return (
    <div className="App">
      <Nav />
      {/* Switch permet d'afficher une seule des 'Routes' qui suit. Sans Switch, plusieurs routes pourraient être affichées */}
      <Switch>
        {/* Route de l'accueil. Notez l'utilisation de "exact path" - sans lui, n'importe quel path commençant par "/" pourrait match!  */}
        <Route exact path="/"> 
          <Home />
        </Route>
        {/* Route par défaut (404)  */}
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
        
      </Switch>

    </div>
  );
}

export default App;