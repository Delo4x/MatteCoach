import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AreaSelection from './pages/AreaSelection';
import Learn from './pages/Learn';
import PacketSelection from './pages/PacketSelection';
import Quiz from './pages/Quiz';
import Results from './pages/Results';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/area/:areaId" element={<AreaSelection />} />
        <Route path="/learn/:areaId/:gradeId" element={<Learn />} />
        <Route path="/packets/:areaId/:gradeId" element={<PacketSelection />} />
        <Route path="/quiz/:areaId/:gradeId/:packetId" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

