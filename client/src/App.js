import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Project from "./components/Project/Project";
import Dashboard from "./components/Dashboard/Dashboard";
import LoginTeam from "./components/Login/LoginTeam";
import LoginUser from "./components/Login/LoginUser";
import Navbar from "./components/Navbar/Navbar";
import PersistLogin from "./components/PersistLogin";
import RegisterTeam from "./components/Register/RegisterTeam";
import RegisterUser from "./components/Register/RegisterUser";
import RequireTeamAuth from "./components/RequireTeamAuth";
import RequireUserAuth from "./components/RequireUserAuth";
import AuthProvider, { AuthContext } from "./context/AuthProvider";
import Tickets from "./components/Tickets/Tickets";
import NotFound from "./components/NotFound/NotFound";
import ManageAccount from "./components/ManageAccount/ManageAccount";

function App() {

  return (
    <div className="App" style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', height: '100%'}}>
      <AuthProvider>
        <BrowserRouter>
            <Navbar />
          <Routes>
          <Route path='*' element={<NotFound />} />
            
            {/* TEAM PRIVATE ROUTES */}
            <Route element={<RequireTeamAuth />}>
              <Route path="/login" element={<LoginUser />} />
              <Route path="/register" element={<RegisterUser />} />
            </Route>

            {/* USER PRIVATE ROUTES */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireUserAuth />}>
                <Route exact path="/" element={<Dashboard />} />
                <Route path="/:projectName" element={<Project />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/account" element={<ManageAccount />} />
              </Route>
            </Route>

            {/* PUBLIC ROUTES */}
            <Route path="/team/register" element={<RegisterTeam />} />
            <Route path="/team/login" element={<LoginTeam />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
