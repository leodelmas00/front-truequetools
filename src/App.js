import CloseSesion from "./components/CloseSesion";
import LogIn from "./components/LogIn";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Form from "./components/Form";
import Config from "./components/Config";
import Post from "./components/Post";

import { Route, Switch } from "wouter";

function App() {
  return (
    <Switch>
      <Route path="/" component={LogIn} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/SignIn" component={SignIn} />
      <Route path="/CloseSesion" component={CloseSesion}/>
      <Route path="/Config" component={Config}/>
      <Route path="/Form" component={Form}/>
      <Route path="/Post" component={Post}/>
    </Switch>
  );
}

export default App;
