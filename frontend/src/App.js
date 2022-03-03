import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import NewSpotFormPage from "./components/NewSpotFormPage";
import SpotsHomePage from "./components/SpotsHomePage";
import Spot from './components/SpotPage'
import * as sessionActions from "./store/session";
import * as spotActions from './store/spots'
import Navigation from "./components/Navigation";
import UpdateSpotForm from "./components/UpdateSpotForm";
import YourBookings from "./components/YourBookings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(spotActions.getAllSpots());
  }, [dispatch]);

  const spots = useSelector(state => state.spots);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <SpotsHomePage spots={{spots}} />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/host-your-spot">
            <NewSpotFormPage />
          </Route>
          <Route path="/spots/:id" exact>
            <Spot />
          </Route>
          <Route path="/spots/:id/update">
            <UpdateSpotForm />
          </Route>
          <Route path='/your-bookings'>
            <YourBookings spots={{spots}}/>
          </Route>
          <Route>
            <Redirect path='/'/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
