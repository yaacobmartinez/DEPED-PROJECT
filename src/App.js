import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { LandingPage } from './Component/LandingPage';
import { PageNotFound } from './Component/PageNotFound';
import Register from './Component/Register';
import Teacher from './Component/Teacher';



function App() {
  return (
    <div>
      <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/teacher" component={Teacher} />
        <Route exact path="/" component={PageNotFound} />
      </Switch>
      </Router>
    </div>
  );
}


export default App;
