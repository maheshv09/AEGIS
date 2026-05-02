import { useState } from 'react';
import { Settings, Save, Plus, Trash2, Clock, Globe, X } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProjectConfig() {
  const [projectName, setProjectName] = useState('Cardiology Safety Monitor');
  const [keywords, setKeywords] = useState(['Aspirin', 'Lisinopril', 'Heart Palpitations']);
  const [newKeyword, setNewKeyword] = useState('');
  
  const handleAddKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (kw) => {
    setKeywords(keywords.filter(k => k !== kw));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Settings className="w-6 h-6 text-violet-600" />
            Project Configuration
          </h2>
          <p className="text-slate-500 text-sm mt-1">Set up sources, keywords, and latency for your monitoring project.</p>
        </div>
        <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm">
          <Save className="w-4 h-4" /> Save Configuration
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Project Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Project Name</label>
              <input 
                type="text" 
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white text-slate-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Target Keywords (Drugs/Symptoms)</label>
              <div className="flex gap-2 mb-3">
                <input 
                  type="text" 
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                  placeholder="e.g. Ibuprofen"
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white text-slate-800"
                />
                <button onClick={handleAddKeyword} className="p-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg border border-slate-200">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.map(kw => (
                  <span key={kw} className="flex items-center gap-1 px-3 py-1 bg-violet-50 text-violet-700 border border-violet-200 rounded-full text-sm">
                    {kw}
                    <button onClick={() => handleRemoveKeyword(kw)} className="hover:text-red-500 ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sources & Latency */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center justify-between">
            Data Sources
            <span className="text-xs font-normal text-violet-600 bg-violet-50 px-2 py-1 rounded border border-violet-100">4 Active</span>
          </h3>
          <div className="space-y-4">
            {/* Source 1 */}
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 font-medium text-slate-800">
                  <Globe className="w-4 h-4 text-sky-500" /> X (Twitter) via API
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                  <label className="toggle-label block overflow-hidden h-5 rounded-full bg-violet-500 cursor-pointer"></label>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4" /> Latency: 
                <select className="ml-2 bg-white border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500">
                  <option>Real-Time</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </div>
            </div>

            {/* Source 2 */}
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 font-medium text-slate-800">
                  <Globe className="w-4 h-4 text-orange-500" /> Reddit Subreddits
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                  <label className="toggle-label block overflow-hidden h-5 rounded-full bg-violet-500 cursor-pointer"></label>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4" /> Latency: 
                <select defaultValue="Daily" className="ml-2 bg-white border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500">
                  <option>Real-Time</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </div>
            </div>
            {/* Source 3 */}
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 font-medium text-slate-800">
                  <Globe className="w-4 h-4 text-emerald-500" /> OpenFDA API
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                  <label className="toggle-label block overflow-hidden h-5 rounded-full bg-violet-500 cursor-pointer"></label>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4" /> Latency: 
                <select defaultValue="Weekly" className="ml-2 bg-white border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500">
                  <option>Real-Time</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </div>
            </div>

            <button className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-medium hover:border-violet-500 hover:text-violet-600 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" /> Add Custom Data Source
            </button>
            
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Add a quick toggle CSS hack for this component
const toggleCss = `
  .toggle-checkbox:checked {
    right: 0;
    border-color: #8b5cf6;
  }
  .toggle-checkbox:checked + .toggle-label {
    background-color: #8b5cf6;
  }
  .toggle-checkbox {
    right: 50%;
    border-color: #cbd5e1;
    z-index: 1;
  }
  .toggle-label {
    background-color: #cbd5e1;
  }
`;
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = toggleCss;
  document.head.appendChild(style);
}
