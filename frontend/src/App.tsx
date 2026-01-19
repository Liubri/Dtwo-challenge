import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import SettingEditor from './components/SettingEditor';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/create" element={<SettingEditor />} />
                    <Route path="/edit/:uid" element={<SettingEditor />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
