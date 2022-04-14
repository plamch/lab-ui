import './App.scss'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { About } from './pages/AboutPage'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import { Home } from './pages/HomePage'
import { Grid } from './pages/GridPage'
import { Calendar } from './pages/CalendarPage'
import { Container } from 'react-bootstrap'

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
                        <Container>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/grid" element={<Grid />} />
                                <Route path="/calendar" element={<Calendar />} />
                            </Routes>
                        </Container>
                    </div>
                </Router>
            </HelmetProvider>
        </div>
    )
}

export default App
