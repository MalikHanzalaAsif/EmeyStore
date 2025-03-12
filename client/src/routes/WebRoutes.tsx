import ScrollOnTop from '../utils/ScrollOnTop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Content from '../components/Content';

const WebRoutes = () => {
    return (
        <Router>
            <ScrollOnTop />
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Content />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default WebRoutes