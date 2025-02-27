import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import User from "./user/page/User";
import MainHeader from "./shared/components/MainHeader";
import NewPlaces from "./places/page/NewPlaces";
import UserPlaces from "./places/page/UserPlaces";
import { DummyDataProvider } from "./shared/context/DummyDataContext";
import UpdatePlaces from "./places/page/UpdatePlaces";
import SignIn from "./user/page/SignIn";
import SIgnUp from "./user/page/SIgnUp";
import { AuthProvider } from "./shared/context/AuthProvider";
import ProtectedRoute from "./shared/components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <MainHeader />
        <div className="container mx-auto px-4 flex flex-col items-center min-h-screen">
          <DummyDataProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<User />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SIgnUp />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/places/:uid" element={<UserPlaces />} />

                <Route path="/places/new" element={<NewPlaces />} />
                <Route
                  path="/places/:uid/:placeID/update"
                  element={<UpdatePlaces />}
                />
              </Route>

              {/* Catch-all Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </DummyDataProvider>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
