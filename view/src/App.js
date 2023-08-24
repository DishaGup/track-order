import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
export const backend_url = "http://localhost:8080"
function App() {
  return (
    <div className="App">
       <Navbar />
       <AppRoutes />
    </div>
  );
}

export default App;
