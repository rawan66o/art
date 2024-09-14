import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Body from "./components/Body";
import Signin from "./components/Signin";
import Children from "./components/Children";
import Login from "./components/Login";
import About from "./components/About";
import Womman from "./components/Womman";
import Makeup from "./components/Makeup";
import Perfunes from "./components/Perfunes";
import Accessories from "./components/Accessories";
import Furniture from "./components/Furniture";
import Techniques from "./components/Techniques";
import Register from "./components/Register";
import Logg from "./components/Logg";
import Whyus from "./components/Whyus";
import Footer from "./components/Footer";
import ShoppingCartProvider from "./context/ShoppingCartContext";
import Details from "./components/Details";
import PaymentForm from "./components/PaymentForm";

import Fone from "./components/Fone";
import Ftwo from "./components/Ftwo";
import Fthree from "./components/Fthree";

function App() {
  return (
    <ShoppingCartProvider>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <About />
                <Whyus />
                <Footer />
              </>
            }
          />
          <Route
            path="/body"
            element={
              <>
                <Header />
                <Body />
                <Footer />
              </>
            }
          />
          <Route
            path="/womman"
            element={
              <>
                <Header />
                <Womman />
                <Footer />
              </>
            }
          />
          <Route
            path="/children"
            element={
              <>
                <Header />
                <Children />
                <Footer />
              </>
            }
          />

          <Route
            path="/details"
            element={
              <>
                <Header />
                <Details />
              </>
            }
          />
          <Route
            path="/makeup"
            element={
              <>
                <Header />
                <Makeup />
                <Footer />
              </>
            }
          />
          <Route
            path="/accessories"
            element={
              <>
                <Header />
                <Accessories />
                <Footer />
              </>
            }
          />
          <Route
            path="/Perfunes"
            element={
              <>
                <Header />
                <Perfunes />
                <Footer />
              </>
            }
          />
          <Route
            path="/Furniture"
            element={
              <>
                <Header />
                <Furniture />
                <Footer />
              </>
            }
          />
          <Route
            path="/techniques"
            element={
              <>
                <Header />
                <Techniques />
                <Footer />
              </>
            }
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/r" element={<Register />} />
          <Route path="/rr" element={<Logg />} />
          <Route path="/pay" element={<PaymentForm price="1" />} />
          <Route path="/f1" element={<Fone />} />
          <Route path="/f2" element={<Ftwo />} />
          <Route path="/f3" element={<Fthree />} />
        </Routes>
      </div>
    </ShoppingCartProvider>
  );
}

export default App;
