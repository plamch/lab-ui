import './App.scss'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { About } from './About'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import { Home } from './features/Home'
import { Grid } from './features/Grid'
import { Calendar } from './features/Calendar'

function App() {
    return (
        <div className="App">
            <ToastContainer autoClose={3000} closeOnClick />
            <HelmetProvider>
                <Helmet>
                    <title>Lab Management</title>
                </Helmet>
                <Router>
                    <div>
                        <ul className="main-menu">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/grid">Grid</Link>
                            </li>
                            <li>
                                <Link to="/calendar">Calendar</Link>
                            </li>
                        </ul>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/grid" element={<Grid />} />
                            <Route path="/calendar" element={<Calendar />} />
                        </Routes>
                    </div>
                </Router>
            </HelmetProvider>
        </div>
    )
}

export default App
