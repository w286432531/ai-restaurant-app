import { BrowserRouter } from "react-router-dom";
import Layout from './pages/router/Layout';

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
