import './App.css';
import Tracker from 'components/Tracker';
import { ThemeProvider } from 'hooks/useThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'components/Navbar';
import { useState } from 'react';

export default function App() {
  const [trackerList, setTrackerList] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  let searchHandler = (e) => {
    if (e.target.value === "") {
      setSearchText("");
      return;
    }
    setSearchText(e.target.value.toLowerCase());
  }

  const filteredData = trackerList.filter(tracker => {
    if (searchText === "") {
      return tracker
    } else {
      return (tracker.title.toLowerCase().includes(searchText))
    }
  })

  return (
    <div className="App">
      <ThemeProvider >
        <Navbar searchHandler={searchHandler} />
        <Tracker error={error} setError={setError} trackerList={filteredData} setTrackerList={setTrackerList} />
      </ThemeProvider>
    </div>
  );
}
