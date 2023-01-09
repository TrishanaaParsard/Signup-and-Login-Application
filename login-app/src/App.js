//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import EmailSent from "./pages/EmailSent";

// styled components
import { StyledContainer } from "./components/Styles";

//Routes
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

function App() {
  return (
        <Router>
        <StyledContainer>
          <Routes>
          <Route index  element={<Home />}/>
          <Route exact path='/signup' element={<Signup />}/>
          <Route exact path='/emailsent' element={<EmailSent />}/>
          <Route exact path='/login' element={<Login />}/>
          <Route exact path='/dashboard' element={<Dashboard />}/>
          </Routes>
        </StyledContainer>
      </Router>
  );
}

export default App;
