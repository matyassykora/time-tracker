import './App.css';
import Tracker from 'components/Tracker';
import { ThemeProvider } from 'hooks/useThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'components/Navbar';
import { format as formatTime, parseISO } from 'date-fns';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function App() {
  const [trackerList, setTrackerList] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  let searchHandler = (e) => {
    if (e.target.value === "") {
      setSearchText("");
      return;
    }
    setSearchText(e.target.value.toLowerCase());
  }

  const filteredData = trackerList.filter(tracker => {
    if (searchText === "") {
      return tracker;
    }

    else if (tracker.title.toLowerCase().includes(searchText)) {
      return true;
    }

    else if (formatTime(parseISO(tracker.createdAt), 'yyyy-MM-dd').toLowerCase().includes(searchText)) {
      return true;
    }

    return false;
  })

  return (
    <div className="App">
      <ThemeProvider >
        <Navbar searchHandler={searchHandler} min={min} max={max} />
        <Tracker setMax={setMax} setMin={setMin} error={error} setError={setError} trackerList={filteredData} setTrackerList={setTrackerList} />
      </ThemeProvider>
      <footer className="fixed-bottom footer text-muted">
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.10)' }}>
          <a className="text-reset btn btn-outline btn-floating fw-bold" target="_blank" rel="noreferrer" href="https://github.com/matyassykora"><FontAwesomeIcon icon={faGithub} /> matyassykora</a>
        </div>
      </footer>
    </div>
  );
}
