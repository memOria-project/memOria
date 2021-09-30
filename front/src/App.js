import { Switch, Route } from 'react-router-dom'
import './App.scss'

import Nav from './components/Nav'
import Home from './components/Home'
import NoMatch from './components/NoMatch'
import SignIn from './components/Signin'
import CardDisplay from './components/CardDisplay'
import CheckSession from './components/CheckSession'
import Profile from './components/Profile'

import CardEditor from './components/CardEditor'
import Subscribe from './components/Subscribe'

function App () {
  return (
    <div className="App">
      <Nav />
      {/* Switch permet d'afficher une seule des 'Routes' qui suit. Sans Switch, plusieurs routes pourraient être affichées */}
      <CheckSession />
      <Switch>
        {/* Route de l'accueil. Notez l'utilisation de "exact path" - sans lui, n'importe quel path commençant par "/" pourrait match!  */}
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/deck/:deckId/:cardId">
          <CardDisplay />
        </Route>
        <Route path="/profile/:deckId/:cardId">
          <CardEditor />
        </Route>
        <Route path="/profile/:deckId/new">
          <CardEditor />
        </Route>
        <Route path="/subscribe">
          <Subscribe />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>

        {/* Route par défaut (404)  */}
        {/* A supprimer une fois le test fini */}
        <Route path="*">
          <NoMatch />
        </Route>

      </Switch>

    </div>
  )
}

export default App
