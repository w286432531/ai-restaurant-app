import { BrowserRouter } from "react-router-dom";
import Layout from './pages/router/Layout';
//TODO call menu and put in store reduce loading time
const App = () => {

  //Make api call to grab categories and menu items
  //Store data into zustand
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
