import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import MultiCharts from './containers/MultiCharts/MultiCharts';
import Claims from './components/Claims/Claims';
import Map from './containers/Map/Map';
import Introduction from './components/Content/Introduction/Introduction';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/demoPlayground" component={MultiCharts} />
          <Route path="/claims" component={Claims} />
          <Route path="/map" component={Map} />
          <Route path="/" exact component={Introduction} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
