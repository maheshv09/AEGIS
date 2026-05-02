import { useState } from 'react';
import { Bot, Link, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AgenticAdmin() {
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    if (!url) return;
    setAnalyzing(true);
    setResult(null);
    
    // Mock the agentic process delay
    setTimeout(() => {
      setAnalyzing(false);
      
      let platform = 'Custom Forum (vBulletin pattern detected)';
      let postWrapper = '.post-container, article.message';
      let strategy = 'Requires JS-rendering (Playwright recommended) due to dynamic loading of pagination.';
      
      if (url.toLowerCase().includes('reddit')) {
        platform = 'Reddit Subreddit';
        postWrapper = 'shreddit-post, .Post';
        strategy = 'Direct API access available via .json endpoint. Standard DOM scraping not recommended due to heavy anti-bot JS.';
      } else if (url.toLowerCase().includes('patientslikeme')) {
        platform = 'PatientsLikeMe Community';
        postWrapper = '.forum-post-wrapper';
        strategy = 'Standard BeautifulSoup scraping viable. Login bypass required for deep threads.';
      } else if (url.toLowerCase().includes('mayoclinic')) {
        platform = 'Mayo Clinic Connect';
        postWrapper = '.discussion-reply';
        strategy = 'BeautifulSoup + Requests. Simple DOM structure detected.';
      }

      setResult({
        platformType: platform,
        extractedSelectors: {
          postWrapper: postWrapper,
          author: '.user-details .username',
          content: '.post-content, .message-body',
          timestamp: 'time.u-dt'
        },
        confidence: 94,
        suggestedStrategy: strategy
      });
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Bot className="w-6 h-6 text-violet-600" />
          Agentic Source Onboarding
          <span className="ml-2 text-xs font-bold bg-gradient-to-r from-violet-500 to-sky-500 text-white px-2 py-1 rounded-full uppercase tracking-wider">USP feature</span>
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Provide a URL to a new community or forum. The AEGIS Agent will dynamically analyze its DOM structure and automatically generate a data acquisition engine without manual coding.
        </p>
      </div>

      <div className="glass-card p-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://patientslikeme.com/forum/cardiology"
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white text-slate-800 shadow-sm"
            />
          </div>
          <button 
            onClick={handleAnalyze}
            disabled={analyzing || !url}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl transition-colors disabled:opacity-50"
          >
            {analyzing ? <Cpu className="w-5 h-5 animate-pulse" /> : <Sparkles className="w-5 h-5 text-violet-300" />}
            {analyzing ? 'Analyzing DOM...' : 'Analyze Source'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {analyzing && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-8 border border-dashed border-violet-300 rounded-xl bg-violet-50/50 flex flex-col items-center justify-center text-violet-600 space-y-4 overflow-hidden"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-violet-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <Bot className="w-12 h-12 relative animate-bounce" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg">Agent is mapping the target...</h3>
              <p className="text-sm opacity-80 font-mono mt-2">Crawling DOM nodes... Identifying post wrappers... Mapping semantic entities...</p>
            </div>
          </motion.div>
        )}

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 border-l-4 border-l-green-500"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 text-green-600 rounded-full">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Engine Profile Generated</h3>
                  <p className="text-sm text-slate-500">The agent successfully mapped the source.</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-slate-600">Agent Confidence</div>
                <div className="text-xl font-bold text-green-500">{result.confidence}%</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Detected Platform</label>
                  <p className="text-slate-700 font-medium">{result.platformType}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Suggested Acquisition Strategy</label>
                  <p className="text-slate-700 font-medium">{result.suggestedStrategy}</p>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Extracted CSS Selectors</label>
                <div className="bg-slate-800 rounded-lg p-4 font-mono text-xs text-sky-300 space-y-2">
                  <div className="flex justify-between border-b border-slate-700 pb-1">
                    <span className="text-slate-400">Post Wrapper:</span>
                    <span>{result.extractedSelectors.postWrapper}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700 pb-1">
                    <span className="text-slate-400">Author:</span>
                    <span>{result.extractedSelectors.author}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700 pb-1">
                    <span className="text-slate-400">Content:</span>
                    <span>{result.extractedSelectors.content}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Timestamp:</span>
                    <span>{result.extractedSelectors.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm">
                Deploy Data Engine
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
