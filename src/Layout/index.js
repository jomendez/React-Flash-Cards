import React from "react";
import { Route, Switch } from 'react-router-dom';

import Header from "./Header";
import Home from "./Home";
import CreateDeck from "./deck-components/CreateDeck";
import ViewDeck from "./deck-components/ViewDeck";
import EditDeck from "./deck-components/EditDeck";
import StudyDeck from "./deck-components/StudyDeck";
import AddCard from "./card-components/AddCard";
import EditCard from "./card-components/EditCard";
import NotFound from "./NotFound";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
              <Home />
          </ Route>
            <Route exact path="/decks/new">
              <CreateDeck />
          </Route>
            <Route exact path="/decks/:deckId">
              <ViewDeck />
          </Route>
            <Route exact path="/decks/:deckId/edit">
              <EditDeck />
          </Route>
            <Route exact path="/decks/:deckId/study">
              <StudyDeck />
          </Route>
            <Route exact path="/decks/:deckId/cards/new">
              <AddCard />
          </Route>
            <Route exact path="/decks/:deckId/cards/:cardId/edit">
              <EditCard />
          </Route>
            <Route>
              <NotFound />
          </ Route>
        </ Switch>
      </div>
    </div>
  );
};

export default Layout;
