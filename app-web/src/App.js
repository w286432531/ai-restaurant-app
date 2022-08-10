import { BrowserRouter } from "react-router-dom";
import Layout from "./components/global/Layout";
import Footer from "./components/global/Footer";
import Home from "./components/pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
