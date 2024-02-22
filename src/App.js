import AnimatedRoutes from './components/AnimateRoutes';
import './index.css';
import '../src/assets/css/tailwind2.css'
import { BrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';;

function App() {
  return (
      <BrowserRouter>
        <AnimatedRoutes />
        <ToastContainer />
      </BrowserRouter>
  );
}

export default App;
