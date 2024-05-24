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
import FailedTrades from "./datosBack/FailedTrades";
import AdminView from "./components/AdminView";
import { Route, Switch } from "wouter";
import Employees from './components/admin-cruds/Employees'
import LoginWorker from './components/LoginWorker'
import Sucursales from './components/admin-cruds/Sucursales'
import CreateSucursal from "./components/admin-cruds/CreateSucursal";
import CreateEmployee from "./components/admin-cruds/CreateEmployee";
import Historial from './components//Historial';
import SelectProduct from './components//SelectProduct';

function App() {
  return (
    <Switch>
      <Route path="/" component={LogIn} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/SignIn" component={SignIn} />
      <Route path="/Login" component={LogIn} />
      <Route path="/Config" component={Config} />
      <Route path="/Form" component={Form} />
      <Route path="/Post" component={Post} />
      <Route path="/AdminView" component={AdminView} />
      <Route path="/UserList" component={UserList} />
      <Route path="/CommentList" component={CommentList} />
      <Route path="/Post/:postId" component={PostDetail} />
      <Route path="/PostList" component={PostList} />
      <Route path="/adminview/employees" component={Employees} />
      <Route path="/adminview/sucursales" component={Sucursales} />
      <Route path="/login-worker" component={LoginWorker} />
      <Route path="/adminview/sucursales/add" component={CreateSucursal} />
      <Route path="/adminview/employees/add" component={CreateEmployee} />
      <Route path="/Historial" component={Historial} />
      <Route path="/SelectProduct" component={SelectProduct} />



    </Switch>
  );
}

export default App;
