import './App.css';
import { Route, Switch } from 'react-router-dom';

import Introduction from './components/Content/Introduction/Introduction';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Introduction} />
      </Switch>
    </div>
  );
}

export default App;
