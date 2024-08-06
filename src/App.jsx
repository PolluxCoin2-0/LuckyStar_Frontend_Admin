import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Wallet, BiddingPage, Dashboard } from "./pages";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Navbar />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            theme="dark"
            newestOnTop={true}
            pauseOnFocusLoss
            toastClassName="custom-toast"
            transition={Zoom}
          />
          <Routes>
            <Route path="/" element={<BiddingPage />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
