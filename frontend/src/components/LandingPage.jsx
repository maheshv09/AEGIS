import { motion } from 'framer-motion';
import { Activity, LayoutDashboard, Settings, Bot, ArrowRight, ShieldAlert } from 'lucide-react';

export function LandingPage({ onNavigate }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Abstract Background Elements for the "Killer" Look */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] bg-sky-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-blob animation-delay-4000"></div>

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

      <motion.div 
        className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-violet-100 shadow-sm text-sm font-semibold text-violet-700 uppercase tracking-widest">
          <span className="relative flex h-2 w-2 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
          </span>
          Team VitalPulse Presents
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight mb-4 text-slate-800"
        >
          AEG<span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 text-transparent bg-clip-text">IS</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-slate-600 max-w-3xl mb-16 leading-relaxed font-light"
        >
          The world's first <strong className="font-semibold text-violet-700">Agentic Command Center</strong> for real-time patient safety. 
          Listen to the internet. Protect the patient.
        </motion.p>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {/* Card 1: Dashboard */}
          <div 
            onClick={() => onNavigate('dashboard')}
            className="group relative bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-violet-200 group-hover:scale-110 transition-transform duration-300">
                <LayoutDashboard className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Live Dashboard</h3>
              <p className="text-slate-500 text-sm mb-6">Monitor real-time adverse events, sentiment, and PII/PHI redactions.</p>
              <div className="mt-auto flex items-center gap-2 text-violet-600 font-bold text-sm group-hover:gap-3 transition-all">
                Enter Command Center <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 2: Config */}
          <div 
            onClick={() => onNavigate('config')}
            className="group relative bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-sky-200 group-hover:scale-110 transition-transform duration-300">
                <Settings className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Project Config</h3>
              <p className="text-slate-500 text-sm mb-6">Define tracking keywords, toggle data sources, and manage latencies.</p>
              <div className="mt-auto flex items-center gap-2 text-sky-600 font-bold text-sm group-hover:gap-3 transition-all">
                Configure Project <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 3: Agentic */}
          <div 
            onClick={() => onNavigate('admin')}
            className="group relative bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl hover:shadow-fuchsia-500/20 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 bg-gradient-to-l from-fuchsia-500 to-pink-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl z-20 shadow-sm">
              Killer USP
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-fuchsia-200 group-hover:scale-110 transition-transform duration-300">
                <Bot className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Agentic Onboarding</h3>
              <p className="text-slate-500 text-sm mb-6">Dynamically map and onboard new social scraping sources via AI.</p>
              <div className="mt-auto flex items-center gap-2 text-fuchsia-600 font-bold text-sm group-hover:gap-3 transition-all">
                Launch AI Agent <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
