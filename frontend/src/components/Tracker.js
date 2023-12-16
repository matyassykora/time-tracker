import { useEffect, useRef } from 'react';
import EditableTextItem from 'components/EditableTextItem';
import { useTimer } from 'hooks/useTimer';
import axios from 'axios';
import { format as formatTime, parseISO } from 'date-fns';

axios.defaults.baseURL = 'http://localhost:8000';


/** 
 * @typedef {Object} tracker
 * @property {number} timestamp
 * @property {string} title
 * @property {number} createdAt
 * @property {number} id
 */

export default function Tracker({ trackerList, setTrackerList, setError, setMin, setMax }) {

  /** @param {number} time */
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

  const getTrackers = () => {
    axios
      .get('/api/trackers/')
      .then(res => {
        if (res.data.length <= 1) {
          setTrackerList(res.data);
        }
        else {
          setTrackerList(res.data);
          setMin(formatTime(parseISO(res.data.at(0).createdAt), 'yyyy-MM-dd'));
          setMax(formatTime(parseISO(res.data.at(-1).createdAt), 'yyyy-MM-dd'));
        }
      })
      .catch(err => {
        setError(err);
      });
  }

  const deleteTracker = (id) => {
    axios
      .delete(`/api/trackers/${id}/`)
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
        getTrackers();
        setTrackerList(trackerList.map(tracker => tracker.id === id ? res.data : tracker));
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
        getTrackers();
        setTrackerList([...trackerList, res.data]);
      })
      .catch(err => {
        setError(err);
      })
    reset();
  }

  const sumList = () => {
    let sum = 0;
    trackerList.forEach(/** @param {tracker} tracker */ tracker => {
      sum += tracker.timestamp;
    });
    return sum;
  }

  const { seconds, startAdd, startConsume, reset, pause } = useTimer();

  /**
   * @param {number} key
   * @param {Event} e
   */
  const handleSubmit = (key, e) => {
    editTracker(key, e.target.value);
  }

  const trackers = trackerList.slice(-10).map(/** @param {tracker} tracker */ tracker => (
    <li key={tracker.id} className={"list-group-item d-flex justify-content-between align-items-center " + (tracker.timestamp < 0 ? "text-danger" : "text-success")}>
      <div className="container">
        <div className="row row-cols-2">
          <div className="col">
            <EditableTextItem key={tracker.id} identifier={tracker.id} handleSubmit={handleSubmit} initialText={tracker.title} />
            {format(tracker.timestamp)}
          </div>
          <div className="col">
            Created:<br />
            {formatTime(parseISO(tracker.createdAt), 'yyyy/MM/dd HH:mm:ss')}
          </div>
        </div>
      </div>
      <button className="btn btn-danger badge" onClick={() => deleteTracker(tracker.id)}>X</button>
    </li>
  ));

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      getTrackers();
      return;
    }
  });

  return (
    <div className="Tracker container" >
      <ul className="list-group list-group-flush list-group-numbered">
        {trackers}
        < p className={"fs-5 " + (sumList() < 0 ? "text-danger" : "text-success")} > <b>Total: {format(sumList())}</b></p >
      </ul>
      <div className="counter-container">
        <p className="fs-3 font-monospace" id="counter">
          {format(seconds)}
        </p>
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
      </div>
    </div>
  )
}
