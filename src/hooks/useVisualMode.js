import { useState } from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {
    if (replace) {
      setMode(newMode);
    } else {
      setHistory((prev) => {
        return [...prev, newMode]
      });
      setMode(newMode);
    }
    
  }

  const back = function() {
    if (history.length > 1) {
      setHistory((prev) => {
        const tempHistory = prev.slice(0, prev.length - 1)
        setMode(tempHistory.slice(-1)[0]);
        return tempHistory;
      });
    }
  }

  return { mode, transition, back };
}