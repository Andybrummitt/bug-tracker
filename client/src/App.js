import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Project from "./components/Projects/Project";
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

function App() {

  return (
    <div className="App" style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', height: '100%'}}>
      <AuthProvider>
        <BrowserRouter>
            <Navbar />
          <Routes>
            {/* TEAM PRIVATE ROUTES */}

            <Route element={<RequireTeamAuth />}>
              <Route path="/login" element={<LoginUser />} />
              <Route path="/register" element={<RegisterUser />} />
            </Route>

            {/* USER PRIVATE ROUTES */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireUserAuth />}>
                <Route exact path="/" element={<Dashboard />} />
                <Route path="/:projectId" element={<Project />} />
                {/* <Route path="/tickets" element={<Tickets />} /> */}
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
