import { Switch, Route } from 'react-router-dom'
import './App.scss'

import Nav from './components/Nav'
import Home from './components/Home'
import NoMatch from './components/NoMatch'
import SignIn from './components/Signin'
import CardDisplay from './components/CardDisplay'
import DeckEditor from './components/DeckEditor'
import Profile from './components/Profile'
import store from './store'
import CardEditor from './components/CardEditor'
import Subscribe from './components/Subscribe'
import Team from './components/Team'
import TestFocus from './components/testFocus'
import { checkSession } from './components/CheckSession/checkSession'
import { SET_CURRENT_DECK_CONTENT } from './actions'
import ResetCard from './components/ResetCard'
import { Helmet } from 'react-helmet'

function App () {
  checkSession()
  return (
    <div className="App">
      <Nav />
      {/* Switch permet d'afficher une seule des 'Routes' qui suit. Sans Switch, plusieurs routes pourraient être affichées */}
      {/* <CheckSession /> */}
      <Switch>
        {/* Route de l'accueil. Notez l'utilisation de "exact path" - sans lui, n'importe quel path commençant par "/" pourrait match!  */}
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signin">
          <Helmet>
            <title>memOria - Se connecter</title>
          </Helmet>
          <SignIn />
        </Route>
        <Route path="/deck/:deckId/:cardId">
          <ResetCard />
          <Helmet>
            <title>memOria - Parcours</title>
          </Helmet>
          <CardDisplay />
        </Route>
        <Route path="/profile/:deckId/new">
          <Helmet>
            <title>memOria - Editeur</title>
          </Helmet>
          <CardEditor />
        </Route>
        <Route path="/cardEditor/:deckId/new">
          <Helmet>
            <title>memOria - Editeur</title>
          </Helmet>
          <CardEditor />
        </Route>
        <Route path="/cardEditor/:deckId/:cardId">
          <Helmet>
            <title>memOria - Editeur</title>
          </Helmet>
          <CardEditor />
        </Route>

        <Route path="/subscribe">
          <Helmet>
            <title>memOria - S'inscrire</title>
          </Helmet>
          <Subscribe />
        </Route>
        <Route path="/profile">
          <Helmet>
            <title>memOria - Votre Profil</title>
          </Helmet>
          <Profile />
        </Route>

        <Route path="/deckEditor/:deckId">
          <Helmet>
            <title>memOria - Editeur</title>
          </Helmet>
          <DeckEditor />
        </Route>

        <Route path="/team">
          <Helmet>
            <title>memOria - Equipe</title>
          </Helmet>
          <Team />
        </Route>
        {/* Route par défaut (404)  */}
        <Route path="/test">
          <TestFocus />
        </Route>
        <Route path="*">
          <Helmet>
            <title>memOria - Erreur</title>
          </Helmet>
          <NoMatch />
        </Route>
      </Switch>

    </div>
  )
}

export default App
