import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useTimer } from 'hooks/useTimer';

const format = (time) => {
  let hours, minutes, seconds, miliseconds;
  if (time < 0) {
    time = Math.abs(time);
    hours = "-";
  } else {
    hours = "";
  }

  hours += Math.floor(time / (1000 * 60 * 60));
  minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  seconds = Math.floor((time % (1000 * 60)) / 1000);
  miliseconds = Math.floor((time % 1000));
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (miliseconds < 10) {
    miliseconds = "00" + miliseconds;
  } else if (miliseconds < 100) {
    miliseconds = "0" + miliseconds;
  }

  return (hours + ":" + minutes + ":" + seconds + ":" + miliseconds);
}

export default function Tracker() {
  const [trackerList, setTrackerList] = useState([]);
  const [error, setError] = useState(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      getTrackers();
      return;
    }
  }, [])

  const getTrackers = () => {
    axios
      .get('/api/trackers')
      .then(res => {
        setTrackerList(res.data);
      })
      .catch(err => {
        setError(err);
      });
  }

  const deleteTracker = (id) => {
    axios
      .delete(`/api/trackers/${id}`)
      .then(res => {
        setTrackerList(trackerList.filter(tracker => tracker.id !== id));
      })
      .catch(err => {
        setError(err);
      });
  }

  const editTracker = (id, text) => {
    axios
      .patch(`/api/trackers/${id}/`, {
        title: text,
      })
      .then(res => {
        setTrackerList([...trackerList, res.data]);
      })
      .catch(err => {
        setError(err);
      });
  }

  const handlePause = () => {
    pause();
    axios.post('/api/trackers/',
      {
        timestamp: seconds,
      })
      .then(res => {
        setTrackerList([...trackerList, res.data]);
      })
      .catch(err => {
        setError(err);
      })
    reset();
  }

  const sumList = () => {
    let sum = 0;
    trackerList.forEach(tracker => {
      sum += tracker.timestamp;
    });
    return sum
  }

  const { seconds, startAdd, startConsume, reset, pause } = useTimer();

  return (
    <div className="Tracker" >
      {error && <p className="text-danger">{error.message}</p>}
      <ul className="list-group list-group-flush list-group-numbered">
        {trackerList.slice(-10).map(tracker => (
          <li key={tracker.id} className={"list-group-item d-flex justify-content-between align-items-center " + (tracker.timestamp < 0 ? "text-danger" : "text-success")}>
            {tracker.title} {format(tracker.timestamp)}<br />
            <button className="btn btn-danger badge" onClick={() => deleteTracker(tracker.id)}>X</button>
          </li>
        ))}
        <p className={sumList() < 0 ? "text-danger" : "text-success"}><b>Total: {format(sumList())}</b></p>
      </ul>
      <div className="counter-container">
        <button className="btn btn-primary" onClick={startAdd}>
          Add
        </button>
        <button className="btn btn-secondary" onClick={handlePause}>
          Set
        </button>
        <button className="btn btn-danger" onClick={reset}>
          Cancel
        </button>
        <button className="btn btn-warning" onClick={startConsume}>
          Consume
        </button>
        <p className="font-monospace" id="counter">
          {format(seconds)}
        </p>
      </div>
    </div>
  )
}
