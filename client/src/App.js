import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginTeam from "./components/Login/LoginTeam";
import LoginUser from "./components/Login/LoginUser";
import ManageAccount from "./components/ManageAccount/ManageAccount";
import NotFound from "./components/NotFound/NotFound";
import PersistLogin from "./components/PersistLogin";
import Project from "./components/Project/Project";
import RegisterTeam from "./components/Register/RegisterTeam";
import RegisterUser from "./components/Register/RegisterUser";
import RequireTeamAuth from "./components/RequireTeamAuth";
import RequireUserAuth from "./components/RequireUserAuth";
import Tickets from "./components/Tickets/Tickets";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        height: "100%",
        background: "#1C1C1C",
      }}
    >
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />

            {/* TEAM PRIVATE ROUTES */}
            <Route element={<RequireTeamAuth />}>
              <Route path="/login" element={<LoginUser />} />
              <Route path="/register" element={<RegisterUser />} />
            </Route>

            {/* USER PRIVATE ROUTES */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireUserAuth />}>
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route path="/:projectName" element={<Project />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/account" element={<ManageAccount />} />
              </Route>
            </Route>

            {/* PUBLIC ROUTES */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/team/register" element={<RegisterTeam />} />
              <Route path="/team/login" element={<LoginTeam />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
