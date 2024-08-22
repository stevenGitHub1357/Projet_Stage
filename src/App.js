import './App.css';
import Menu from './components/menu';
import { useCookies } from 'react-cookie';
import Login from './components/login/login';

function App(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['islogged_react','matricule_react']);
  if(cookies.islogged_react === "true" ){
    return(
      <Menu/>
    )
  }
  return(
    <Login/>
  );
}

export default App;
