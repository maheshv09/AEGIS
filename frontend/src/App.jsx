import { useState, useEffect } from 'react';
import { Activity, RefreshCw, LayoutDashboard, Settings, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiveTicker } from './components/LiveTicker';
import { SentimentChart } from './components/SentimentChart';
import { SignalFeed } from './components/SignalFeed';
import { ProjectConfig } from './components/ProjectConfig';
import { AgenticAdmin } from './components/AgenticAdmin';
import { LandingPage } from './components/LandingPage';

function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchSignals = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/signals`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      setSignals(prev => {
        const newSignals = [...data.signals, ...prev];
        const uniqueSignals = Array.from(new Map(newSignals.map(item => [item.id, item])).values());
        return uniqueSignals.slice(0, 50);
      });
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      console.error("Failed to fetch signals:", err);
      setError("Failed to connect to the Monitoring Engine. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 10000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    if (currentRoute === 'config') return <ProjectConfig />;
    if (currentRoute === 'admin') return <AgenticAdmin />;
    
    // Default: Dashboard
    return (
      <main className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)] min-h-[800px]">
        <div className="col-span-1 lg:col-span-1 flex flex-col gap-6 h-full">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card flex flex-col overflow-hidden flex-1"
          >
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Live Activity Ticker</h2>
            </div>
            <div className="p-3 flex-1 overflow-hidden">
              <LiveTicker signals={signals} />
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card flex flex-col h-64 shrink-0"
          >
            <div className="p-4 border-b border-slate-100 bg-slate-50 shrink-0">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Sentiment Trend</h2>
            </div>
            <div className="p-4 flex-1">
              <SentimentChart />
            </div>
          </motion.section>
        </div>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-1 lg:col-span-3 glass-card flex flex-col relative overflow-hidden h-full"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-400 to-violet-500 opacity-80"></div>
          <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0 mt-1">
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              High-Risk Signal Feed
            </h2>
            <div className="text-xs font-medium text-slate-500">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
          <div className="p-5 flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50">
            <SignalFeed signals={signals} />
          </div>
        </motion.section>
      </main>
    );
  };

  if (currentRoute === 'home') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LandingPage onNavigate={setCurrentRoute} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans transition-colors duration-300">
      <header className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentRoute('home')}>
            <div className="p-2.5 bg-violet-100 rounded-xl border border-violet-200 shadow-sm hover:scale-105 transition-transform">
              <Activity className="w-8 h-8 text-violet-600" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 flex items-center gap-3">
                AEGIS 
              </h1>
              <p className="text-slate-500 text-sm font-medium mt-1">Patient Experience & Safety Signals</p>
            </div>
          </div>

          <nav className="hidden md:flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm ml-8">
            <button 
              onClick={() => setCurrentRoute('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentRoute === 'dashboard' ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'}`}
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </button>
            <button 
              onClick={() => setCurrentRoute('config')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentRoute === 'config' ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'}`}
            >
              <Settings className="w-4 h-4" /> Project Config
            </button>
            <button 
              onClick={() => setCurrentRoute('admin')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentRoute === 'admin' ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'}`}
            >
              <Bot className="w-4 h-4" /> Agentic Source Setup
            </button>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {error && <span className="text-sm font-medium text-red-500 max-w-xs text-right bg-red-50 px-3 py-1 rounded-md border border-red-100">{error}</span>}
          <div className="text-right hidden md:block">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Engine Status</div>
            <div className="text-sm font-semibold text-violet-600 flex items-center gap-2 justify-end">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              Live Monitoring
            </div>
          </div>
          {currentRoute === 'dashboard' && (
            <button 
              onClick={fetchSignals} 
              disabled={loading}
              className="p-2.5 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 shadow-sm transition-colors disabled:opacity-50 text-slate-600"
              title="Force refresh"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-violet-500' : ''}`} />
            </button>
          )}
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentRoute}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
