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
import PostDetailAdmin from "./components/PostDetailAdmin";
import FailedTrades from "./datosBack/FailedTrades";
import AdminView from "./components/AdminView";
import { Route, Switch } from "wouter";
import Employees from './components/admin-cruds/Employees';
import LoginWorker from './components/LoginWorker';
import Sucursales from './components/admin-cruds/Sucursales';
import CreateSucursal from "./components/admin-cruds/CreateSucursal";
import CreateEmployee from "./components/admin-cruds/CreateEmployee";
import Historial from './components//Historial';
import SelectProduct from './components//SelectProduct';
import EmployeeDetail from "./components/admin-cruds/EmployeeDetail";
import UserPosts from './components/UserPosts';
import PostSolicitudes from "./components/PostSolicitudes";
import EmployeeView from "./components/EmployeeView";
import TradeCheck from "./components/admin-cruds/TradeCheck";
import SucursalEdit from "./components/admin-cruds/SucursalEdit";
import EditProfile from "./components/EditProfile";
import Users from './components/admin-cruds/Users';
import Ventas from './components/admin-cruds/Ventas';
import HistorialSolicitudes from "./components/HistorialSolicitudes";
import Support from "./components/Support";


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
      <Route path="/Post-admin/:postId" component={PostDetailAdmin} />

      <Route path="/Post/:postId/solicitudes" component={PostSolicitudes} />
      <Route path="/PostList" component={PostList} />
      <Route path="/adminview/employees" component={Employees} />
      <Route path="/adminview/sucursales" component={Sucursales} />
      <Route path="/login-worker" component={LoginWorker} />
      <Route path="/adminview/sucursales/add" component={CreateSucursal} />
      <Route path="/adminview/employees/add" component={CreateEmployee} />
      <Route path="/Historial" component={Historial} />
      <Route path="/SelectProduct/:id" component={SelectProduct} />
      <Route path="/adminview/EmployeeDetail/:id" component={EmployeeDetail} />
      <Route path="/my-posts" component={UserPosts} />
      <Route path="/EmployeeView" component={EmployeeView} />
      <Route path="/TradeCheck/:id" component={TradeCheck} />
      <Route path="/SucursalEdit/:id" component={SucursalEdit} />
      <Route path="/EditProfile" component={EditProfile} />
      <Route path="/HistorialSolicitudes" component={HistorialSolicitudes} />
      <Route path="/adminview/Users" component={Users} />
      <Route path="/adminview/Ventas" component={Ventas} />
      <Route path="/Support" component={Support} />


    </Switch>
  );
}

export default App;
