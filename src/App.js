import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { Link, Route, Switch } from "wouter";

function App() {

  return (

    <Switch>
      <Route path="/" component={LogIn} />
      <Route path="/SignUp" component={SignUp} />
    </Switch>

  );

}

export default App;
