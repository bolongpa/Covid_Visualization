import './App.css';
import { Route, Switch } from 'react-router-dom';

import Map from './containers/Map/Map';
import Introduction from './components/Content/Introduction/Introduction';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/map" component={Map} />
        <Route path="/" exact component={Introduction} />
      </Switch>
    </div>
  );
}

export default App;
