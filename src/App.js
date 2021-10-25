import { Switch, Route } from 'react-router-dom';
import Home from "./Home";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from "./Login";

function App(props) {
 
  
  return (
    <div className="App">
      <Switch>
        <Route path="/Home" component={Home}/>
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
