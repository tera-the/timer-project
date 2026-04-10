import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Clock from './pages/Clock.tsx'
import Timer from './pages/Timer.tsx'
import Stopwatch from './pages/Stopwatch.tsx'
import Alarm from './pages/Alarm.tsx'
import Layout from './Layout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="time" element={<Clock />} />
          <Route path="timer" element={<Timer />} />
          <Route path="stopwatch" element={<Stopwatch />} />
          <Route path="" element={<Alarm />} />
          <Route path="alarm" element={<Alarm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)