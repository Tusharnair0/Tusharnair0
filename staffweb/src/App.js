import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './Components/Auth/Auth';
import Bills from './Components/Bill/Bills';
import Header from "./Components/Header/Header";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
      <>
      <Routes>
        <Route path="/login" element={<Auth authRoute={"login"} />}/>
        <Route path='/' element={
          <ProtectedRoute>
            <>
              <Header />
              <Bills />
            </>
          </ProtectedRoute>
        }/>
      </Routes>
      </>
  );
}

export default App;
