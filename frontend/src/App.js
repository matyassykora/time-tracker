import './App.css';
import Tracker from 'components/Tracker';
import { ThemeProvider } from 'hooks/useThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'components/Navbar';

export default function App() {
  return (
    <div className="App">
      <ThemeProvider >
        <Navbar />
        <Tracker />
      </ThemeProvider>
    </div>
  );
}
