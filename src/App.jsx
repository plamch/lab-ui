import React from 'react'
import logo from './logo.svg'
import './App.scss'
import { Counter } from './features/counter/Counter'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { About } from './About'

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                    <Routes>
                        <Route path="/about" element={<About />} />
                    </Routes>
                </div>
            </Router>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Counter />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <span>
                    <span>Learn </span>
                    <a className="App-link" href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                        React
                    </a>
                    <span>, </span>
                    <a className="App-link" href="https://redux.js.org/" target="_blank" rel="noopener noreferrer">
                        Redux
                    </a>
                    <span>, </span>
                    <a
                        className="App-link"
                        href="https://redux-toolkit.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Redux Toolkit
                    </a>
                    ,<span> and </span>
                    <a
                        className="App-link"
                        href="https://react-redux.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        React Redux
                    </a>
                </span>
            </header>
        </div>
    )
}

export default App
