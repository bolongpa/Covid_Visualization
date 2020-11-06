import './App.css';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Map from './containers/Map/Map';
import Introduction from './components/Content/Introduction/Introduction';

function App() {
  return (
    <div className="App">
      <Layout>
      <Switch>
        <Route path="/map" component={Map} />
        <Route path="/" exact component={Introduction} />
      </Switch>
      </Layout>
    </div>
  );
}

export default App;
