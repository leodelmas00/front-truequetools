import LogIn from "./components/LogIn";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Form from "./components/Form";
import Config from "./components/Config";
import Post from "./components/Post";
import PostList from "./components/PostList";
import UserList from "./components/UserList";
import CommentList from "./components/CommentList";
import PostDetail from "./components/PostDetail";


import AdminView from "./components/AdminView"; // Corrige la ruta de importación de AdminView
import PostList from "./datosBack/PostList";
import FailedTrades from "./datosBack/FailedTrades";
import { Route, Switch } from "wouter";

function App() {
  return (
    <Switch>
      <Route path="/" component={LogIn} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/SignIn" component={SignIn} />
      <Route path="/Login" component={LogIn}/>
      <Route path="/Config" component={Config}/>
      <Route path="/Form" component={Form}/>
      <Route path="/Post" component={Post}/>
      <Route path="/AdminView" component={AdminView}/>
      <Route path="/PostList" component={PostList}/>
      <Route path="/UserList" component={UserList}/>
      <Route path="/CommentList" component={CommentList}/>
      <Route path="/PostDetail" component={PostDetail}/>
    </Switch>
  );
}

export default App;
