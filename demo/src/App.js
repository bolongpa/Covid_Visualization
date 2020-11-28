import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Claims from './components/Claims/Claims';
import DataExploration from './containers/DataExploration/DataExploration';
import Introduction from './components/Content/Introduction/Introduction';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/claims" component={Claims} />
          <Route path="/dataExploration" component={DataExploration} />
          <Route path="/" exact component={Introduction} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
