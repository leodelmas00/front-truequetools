import LogIn from "./components/LogIn";
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp";
import { Route, Switch } from "wouter";



function App() {
  return (
    <Switch>
      <Route path="/" component={LogIn} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/SignIn" component={SignIn} />
    </Switch>
  );
}

export default App;
