import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import Tracker from 'components/Tracker';
import Navbar from 'components/Navbar';
import { ThemeProvider } from 'hooks/useThemeContext';

import { format as formatTime, parseISO } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons';

/** 
 * @typedef {Object} tracker
 * @property {number} timestamp
 * @property {string} title
 * @property {number} createdAt
 * @property {number} id
 */

export default function App() {
  const [trackerList, setTrackerList] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  /** @param {Event} e */
  const searchHandler = (e) => {
    if (e.target.value === "") {
      setSearchText("");
      return;
    }
    setSearchText(e.target.value.toLowerCase());
  }

  const filteredData = trackerList.filter(/** @param {tracker} tracker */ tracker => {
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
    <div className="App d-flex flex-column vh-100">
      <header className="clearfix">
        <ThemeProvider>
          <Navbar searchHandler={searchHandler} min={min} max={max} />
        </ThemeProvider>
      </header>

      {error && <p className="text-danger">{error.message}</p>}
      <div className="container-xxl py-4 d-flex flex-grow-1">
        <Tracker setMax={setMax} setMin={setMin} setError={setError} trackerList={filteredData} setTrackerList={setTrackerList} />
      </div>

      <footer className="mt-3 footer clearfix text-muted" >
        <div className="text-center p-3 border-top" >
          <a className="text-reset btn btn-outline btn-floating fw-bold" target="_blank" rel="noreferrer" href="https://github.com/matyassykora"><FontAwesomeIcon icon={faGithub} /> matyassykora</a>
        </div>
      </footer>
    </div>
  );
}
