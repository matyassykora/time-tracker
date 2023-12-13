import ThemeSwitcher from 'components/ThemeSwitcher';
import { useState } from 'react';

export default function Navbar({ searchHandler, min, max }) {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button className="navbar-brand btn" type="button">Trackers</button>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" onClick={toggleNav}></span>
        </button>
        <div className={(showNav ? "show" : "") + " collapse navbar-collapse"} id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
          <form className="d-flex" role="search">
            <input className="d-flex form-control me-2" onChange={searchHandler} min={min} max={max} aria-label="Date" type="date" />
            <input onChange={searchHandler} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          </form>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
