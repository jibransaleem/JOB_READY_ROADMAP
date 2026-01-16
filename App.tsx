
import React, { useState, useEffect, useMemo } from 'react';
import { ROADMAP_DATA, PORTFOLIO_PROJECTS } from './constants';
import { RoadmapModule, Skill, Project } from './types';
import { gemini } from './services/geminiService';
import { 
  LayoutDashboard, 
  Map, 
  Briefcase, 
  BrainCircuit, 
  Rocket, 
  Search, 
  CheckCircle2, 
  Circle, 
  ArrowRight,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Award,
  Clock,
  Zap,
  BookOpen,
  Calendar,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

// --- Sub-components ---

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Curriculum', icon: Layers },
    { id: 'projects', label: 'Build Lab', icon: Briefcase },
    { id: 'buddy', label: 'AI Architect', icon: BrainCircuit },
  ];

  return (
    <div className="w-64 h-screen fixed left-0 top-0 border-r border-slate-800 bg-slate-900/80 p-6 flex flex-col gap-8 z-50">
      <div className="flex items-center gap-3 px-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <Rocket className="text-white w-5 h-5" />
        </div>
        <div>
          <h1 className="font-black text-lg text-white leading-none tracking-tighter">AI 2026</h1>
          <p className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase mt-1">Senior Track</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeTab === tab.id 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 shadow-[inset_0_0_15px_rgba(79,70,229,0.05)]' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <tab.icon size={18} />
            <span className="font-bold text-sm">{tab.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto bg-slate-800/30 p-5 rounded-2xl border border-slate-700/50">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Readiness Level</span>
        </div>
        <div className="w-full bg-slate-700/50 h-1.5 rounded-full overflow-hidden mb-2">
          <div className="bg-emerald-500 h-full w-[12%] transition-all duration-1000 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        </div>
        <p className="text-[10px] text-slate-500 font-medium">
          Job Ready by: <span className="text-slate-200">Sep 2026</span>
        </p>
      </div>
    </div>
  );
};

const Header = ({ title }: { title: string }) => (
  <header className="h-20 border-b border-slate-800/50 bg-slate-900/30 flex items-center justify-between px-10 sticky top-0 z-40 backdrop-blur-xl">
    <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">{title}</h2>
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-4 bg-slate-800/40 px-4 py-2 rounded-2xl border border-slate-700/50">
        <div className="text-right">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Candidate</p>
          <p className="text-xs font-black text-slate-200">System Architect</p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
          <Zap size={16} className="text-indigo-400" />
        </div>
      </div>
    </div>
  </header>
);

// --- Pages ---

const DashboardPage = ({ 
  progressCount, 
  totalSkills,
  totalHoursMastered,
  totalHoursTarget
}: { 
  progressCount: number, 
  totalSkills: number,
  totalHoursMastered: number,
  totalHoursTarget: number
}) => {
  const chartData = [
    { name: 'Jan', val: 0 },
    { name: 'Feb', val: 8 },
    { name: 'Mar', val: 22 },
    { name: 'Apr', val: 40 },
    { name: 'May', val: 55 },
    { name: 'Jun', val: 78 },
  ];

  const stats = [
    { label: 'Units Mastered', value: progressCount, total: totalSkills, color: 'text-indigo-400', icon: Award },
    { label: 'Time Invested', value: totalHoursMastered, total: totalHoursTarget, unit: 'h', color: 'text-emerald-400', icon: Clock },
    { label: 'Remaining Hours', value: totalHoursTarget - totalHoursMastered, total: totalHoursTarget, unit: 'h', color: 'text-rose-400', icon: Calendar },
  ];

  return (
    <div className="p-10 space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-[2rem] p-8 border border-slate-800 hover:border-indigo-500/30 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-800 rounded-lg">
                <stat.icon size={16} className="text-slate-400" />
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
            <div className="flex items-baseline gap-2 mb-6">
              <span className={`text-5xl font-black tracking-tighter ${stat.color}`}>{stat.value}</span>
              <span className="text-slate-500 font-bold">/ {stat.total} {stat.unit || ''}</span>
            </div>
            <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${stat.color.replace('text', 'bg')}`} 
                style={{ width: `${(Math.min(Number(stat.value), Number(stat.total)) / Number(stat.total)) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="glass rounded-[2.5rem] p-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">Growth Velocity</h3>
              <p className="text-slate-500 text-sm font-medium mt-1">Accumulated mastery over time.</p>
            </div>
            <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black text-indigo-400 uppercase tracking-widest">
              Live Updates
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} tickMargin={15} />
                <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} tickMargin={15} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.3)' }}
                  itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="val" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#velocityGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-[2.5rem] p-10 flex flex-col">
          <h3 className="text-xl font-black text-white tracking-tight mb-8">Next Sprint Priorities</h3>
          <div className="space-y-4 flex-1">
            {[
              { title: 'Transformer Math & Scratch Impl', mod: 'Module 01', hrs: '20h', icon: '🧬' },
              { title: 'Async Python Mastery', mod: 'Module 01', hrs: '25h', icon: '🐍' },
              { title: 'RAG Architecture Audit', mod: 'Module 02', hrs: '35h', icon: '🔍' },
            ].map((task, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-slate-800/30 rounded-3xl border border-slate-700/50 hover:border-indigo-500/40 transition-all cursor-pointer group">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {task.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 leading-tight">{task.title}</h4>
                    <p className="text-[10px] text-indigo-400 font-black uppercase mt-1 tracking-widest">{task.mod}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-2xl border border-slate-800 shadow-lg">
                  <Clock size={12} className="text-slate-500" />
                  <span className="text-xs font-black text-slate-400 tracking-tighter">{task.hrs}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20">
            Open Curated Study Plan
          </button>
        </div>
      </div>
    </div>
  );
};

const RoadmapPage = ({ 
  completedSkills, 
  onToggleSkill 
}: { 
  completedSkills: string[], 
  onToggleSkill: (id: string) => void 
}) => {
  const [selectedModule, setSelectedModule] = useState<RoadmapModule | null>(ROADMAP_DATA[0]);
  const [explainingSkill, setExplainingSkill] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleExplain = async (skillName: string) => {
    setLoading(true);
    setExplainingSkill(skillName);
    const text = await gemini.explainConcept(skillName);
    setExplanation(text);
    setLoading(false);
  };

  return (
    <div className="p-10 flex gap-10 h-full max-h-[calc(100vh-5rem)] overflow-hidden">
      <div className="w-[420px] space-y-4 overflow-y-auto pr-6 custom-scrollbar pb-10">
        <div className="mb-8 pl-2">
          <h3 className="text-3xl font-black text-white tracking-tighter">Roadmap Path</h3>
          <p className="text-slate-500 text-sm font-medium mt-1">60+ Skills in Logical Sequence</p>
        </div>
        {ROADMAP_DATA.map((mod) => {
          const modCompletedSkills = mod.skills.filter(s => completedSkills.includes(s.id));
          const modCompletedCount = modCompletedSkills.length;
          const modCompletedHours = modCompletedSkills.reduce((acc, s) => acc + s.timeEstimate, 0);
          const progress = (modCompletedCount / mod.skills.length) * 100;
          const isActive = selectedModule?.id === mod.id;

          return (
            <button
              key={mod.id}
              onClick={() => setSelectedModule(mod)}
              className={`w-full text-left p-6 rounded-[2rem] transition-all border group relative overflow-hidden ${
                isActive 
                  ? 'bg-indigo-600/10 border-indigo-500/50 shadow-xl' 
                  : 'bg-slate-800/20 border-slate-800 hover:bg-slate-800/40'
              }`}
            >
              {isActive && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />}
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all ${isActive ? 'bg-indigo-600 shadow-lg scale-110' : 'bg-slate-800'}`}>
                  {mod.icon}
                </div>
                <div>
                  <h4 className={`font-black text-lg tracking-tight leading-tight ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {mod.title.split(': ')[1]}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-black uppercase mt-1 tracking-widest">
                    {modCompletedHours} / {mod.totalTargetHours} Hours
                  </p>
                </div>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-4">
                <div 
                  className={`h-full transition-all duration-700 ${progress === 100 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]'}`} 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex-1 pb-10">
        {selectedModule && (
          <div className="glass rounded-[3rem] p-12 h-full overflow-y-auto custom-scrollbar border-slate-800/50 bg-slate-900/40 backdrop-blur-2xl">
            <div className="flex items-start justify-between mb-12 border-b border-slate-800/50 pb-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-indigo-500/30">
                    Priority Phase 0{selectedModule.priority}
                  </span>
                  <span className="text-slate-700">•</span>
                  <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    <Clock size={14} />
                    {selectedModule.totalTargetHours} Hours Allocated
                  </div>
                </div>
                <h3 className="text-5xl font-black text-white tracking-tighter leading-none mb-6">
                  {selectedModule.title}
                </h3>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">{selectedModule.description}</p>
              </div>
              <div className="p-6 bg-slate-800/50 rounded-3xl border border-slate-700/50 flex flex-col items-center justify-center min-w-[120px]">
                <div className="text-4xl font-black text-white">{selectedModule.skills.length}</div>
                <div className="text-[10px] font-black text-slate-500 uppercase mt-1 tracking-widest text-center">Core Modules</div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {selectedModule.skills.map((skill) => {
                const isCompleted = completedSkills.includes(skill.id);
                return (
                  <div 
                    key={skill.id}
                    className={`p-8 rounded-[2.5rem] border transition-all relative group ${
                      isCompleted 
                        ? 'bg-emerald-500/5 border-emerald-500/20 shadow-[0_10px_30px_rgba(16,185,129,0.02)]' 
                        : 'bg-slate-800/30 border-slate-700/40 hover:border-slate-600 hover:bg-slate-800/50 hover:-translate-y-1'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-8 flex-1">
                        <button 
                          onClick={() => onToggleSkill(skill.id)}
                          className={`flex-shrink-0 transition-all transform hover:scale-110 active:scale-95 ${isCompleted ? 'text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'text-slate-700 hover:text-slate-500'}`}
                        >
                          {isCompleted ? <CheckCircle2 size={40} strokeWidth={2.5} /> : <Circle size={40} strokeWidth={2.5} />}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h5 className={`font-black text-2xl tracking-tight ${isCompleted ? 'text-emerald-100' : 'text-white'}`}>
                              {skill.name}
                            </h5>
                            <span className="px-3 py-1 bg-slate-900/80 rounded-xl border border-slate-800 text-[10px] font-black text-slate-500 flex items-center gap-2 uppercase tracking-tighter">
                              <Clock size={12} /> {skill.timeEstimate}h
                            </span>
                          </div>
                          <p className="text-slate-500 text-base font-medium leading-relaxed max-w-2xl">{skill.description}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleExplain(skill.name)}
                        className="bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white px-6 py-3 rounded-2xl font-black border border-indigo-500/20 transition-all flex items-center gap-2 group/btn text-[11px] uppercase tracking-widest shadow-lg active:scale-95"
                      >
                        <BrainCircuit size={16} />
                        Architect Insights
                      </button>
                    </div>

                    {explainingSkill === skill.name && (
                      <div className="mt-10 p-10 bg-slate-950/80 rounded-[3rem] border border-indigo-500/20 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-xl shadow-indigo-600/30">
                              <Sparkles size={20} className="text-white" />
                            </div>
                            <div>
                              <span className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.3em]">Technical Deep-Dive</span>
                              <p className="text-xs text-slate-500 font-bold uppercase mt-0.5">Gemini 2026 Engine</p>
                            </div>
                          </div>
                          <button onClick={() => setExplainingSkill(null)} className="text-slate-600 hover:text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] transition-colors border border-slate-800 px-4 py-2 rounded-xl">
                            Dismiss
                          </button>
                        </div>
                        {loading ? (
                          <div className="space-y-6">
                            <div className="h-4 bg-slate-800/40 rounded-full animate-pulse w-3/4" />
                            <div className="h-4 bg-slate-800/40 rounded-full animate-pulse w-full" />
                            <div className="h-4 bg-slate-800/40 rounded-full animate-pulse w-5/6" />
                            <div className="h-20 bg-slate-800/20 rounded-3xl animate-pulse w-full mt-10" />
                          </div>
                        ) : (
                          <div className="text-base text-slate-300 leading-relaxed max-w-none space-y-6 font-medium">
                            {explanation.split('\n').map((line, i) => {
                              if (line.startsWith('#')) {
                                return <h4 key={i} className="text-2xl font-black text-white mt-8 mb-4 tracking-tight">{line.replace(/#/g, '').trim()}</h4>;
                              }
                              if (line.startsWith('* ') || line.startsWith('- ')) {
                                return <li key={i} className="ml-4 list-disc text-slate-400 pl-2 mb-2">{line.replace(/^[\*\-]\s+/, '')}</li>;
                              }
                              return <p key={i} className="text-slate-400">{line}</p>;
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ... ProjectsPage and AIStudyBuddyPage updated with same high-density aesthetic ...

const ProjectsPage = () => {
  return (
    <div className="p-10 space-y-12 pb-20">
      <div className="flex items-end justify-between border-b border-slate-800/50 pb-12">
        <div className="max-w-3xl">
          <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-black text-amber-500 uppercase tracking-widest mb-4 inline-block">Proof of Competence</span>
          <h3 className="text-6xl font-black tracking-tighter text-white leading-none">THE BUILD LAB</h3>
          <p className="text-slate-400 text-xl font-medium mt-6 leading-relaxed">Theory is cheap. Deploying distributed AI systems that handle 10k concurrent sessions is where the ROI lives.</p>
        </div>
        <button className="bg-white text-slate-950 px-10 py-5 rounded-[2rem] font-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10 flex items-center gap-4 uppercase tracking-widest text-xs">
          New Architecture Prompt
          <Zap size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {PORTFOLIO_PROJECTS.map((project) => (
          <div key={project.id} className="glass rounded-[3rem] p-12 border border-slate-800/50 hover:border-indigo-500/50 transition-all group flex flex-col relative overflow-hidden bg-slate-900/40">
            <div className="absolute top-0 right-0 p-8 text-8xl font-black text-white/5 pointer-events-none select-none">
              0{project.id.replace('p', '')}
            </div>
            <div className="flex justify-between items-start mb-12 relative z-10">
              <span className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                {project.category}
              </span>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700 animate-pulse" />
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{project.status}</span>
              </div>
            </div>
            <h4 className="text-4xl font-black mb-6 text-white group-hover:text-indigo-400 transition-colors tracking-tighter leading-none relative z-10">{project.name}</h4>
            <p className="text-slate-500 text-lg font-medium mb-12 leading-relaxed flex-grow relative z-10">
              {project.description}
            </p>
            <div className="flex items-center justify-between pt-10 border-t border-white/5 relative z-10">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-2xl border-[5px] border-slate-950 bg-slate-800 flex items-center justify-center text-[10px] font-black text-indigo-400 shadow-xl">
                    T{i}
                  </div>
                ))}
              </div>
              <button className="bg-slate-800 hover:bg-indigo-600 px-8 py-4 rounded-[1.5rem] text-white font-black text-[12px] uppercase tracking-widest flex items-center gap-3 transition-all shadow-xl active:scale-95">
                Boot Cluster <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AIStudyBuddyPage = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Ready to architectural review. I am initialized with the 2026 AI Roadmap knowledge graph. What component are we optimizing today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;
    const userMsg = query;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setQuery("");
    setIsTyping(true);
    const explanation = await gemini.explainConcept(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: explanation }]);
    setIsTyping(false);
  };

  return (
    <div className="p-10 flex flex-col h-[calc(100vh-5rem)]">
      <div className="flex-1 glass rounded-[3rem] p-12 overflow-y-auto mb-10 flex flex-col gap-10 custom-scrollbar bg-slate-900/60 shadow-inner">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-5 duration-500`}>
            <div className={`max-w-[75%] p-8 rounded-[2rem] text-lg leading-relaxed font-medium shadow-2xl ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-600/10' 
                : 'bg-slate-800/90 text-slate-200 rounded-tl-none border border-slate-700/50'
            }`}>
              {m.text.split('\n').map((line, idx) => {
                 if (line.startsWith('#')) return <h4 key={idx} className="text-xl font-black mb-4 mt-4 text-white uppercase tracking-tight">{line.replace(/#/g, '')}</h4>;
                 return <p key={idx} className="mb-4 opacity-90">{line}</p>;
              })}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/50 flex gap-2 shadow-xl">
              <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" />
              <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-6 p-4 bg-slate-900/80 rounded-[2.5rem] border border-slate-800/80 shadow-2xl backdrop-blur-3xl mb-10">
        <div className="w-14 h-14 bg-indigo-600/20 rounded-2xl border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
          <BrainCircuit size={24} className="text-indigo-400" />
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Consult with the Architect (e.g., 'Compare vLLM vs TGI for high latency RAG')"
          className="flex-1 bg-transparent px-2 py-3 focus:outline-none text-white text-xl font-bold placeholder:text-slate-700 tracking-tight"
        />
        <button 
          onClick={handleSend}
          disabled={isTyping}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-12 rounded-3xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center gap-3 shadow-xl shadow-indigo-600/30 active:scale-95"
        >
          Dispatch
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [completedSkills, setCompletedSkills] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('ai_mastery_progress_2026');
    if (saved) setCompletedSkills(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('ai_mastery_progress_2026', JSON.stringify(completedSkills));
  }, [completedSkills]);

  const toggleSkill = (skillId: string) => {
    setCompletedSkills(prev => 
      prev.includes(skillId) ? prev.filter(id => id !== skillId) : [...prev, skillId]
    );
  };

  const allSkills = useMemo(() => ROADMAP_DATA.flatMap(m => m.skills), []);
  const totalSkills = allSkills.length;
  const progressPercent = Math.round((completedSkills.length / totalSkills) * 100);
  
  const totalHoursTarget = useMemo(() => ROADMAP_DATA.reduce((acc, m) => acc + m.totalTargetHours, 0), []);
  const totalHoursMastered = useMemo(() => {
    return allSkills
      .filter(s => completedSkills.includes(s.id))
      .reduce((acc, s) => acc + s.timeEstimate, 0);
  }, [allSkills, completedSkills]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardPage progressCount={completedSkills.length} totalSkills={totalSkills} totalHoursMastered={totalHoursMastered} totalHoursTarget={totalHoursTarget} />;
      case 'roadmap': return <RoadmapPage completedSkills={completedSkills} onToggleSkill={toggleSkill} />;
      case 'projects': return <ProjectsPage />;
      case 'buddy': return <AIStudyBuddyPage />;
      default: return <DashboardPage progressCount={completedSkills.length} totalSkills={totalSkills} totalHoursMastered={totalHoursMastered} totalHoursTarget={totalHoursTarget} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="ml-64 relative min-h-screen flex flex-col bg-[radial-gradient(circle_at_top_right,rgba(45,21,255,0.05),transparent_60%)]">
        <Header title={activeTab === 'dashboard' ? 'Strategic Intelligence' : activeTab === 'roadmap' ? 'Curriculum Architecture' : activeTab.toUpperCase()} />
        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>
        {/* Global Progress Strip */}
        <div className="h-2 bg-slate-900 w-full relative group cursor-help">
          <div className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all duration-1000 ease-out" style={{ width: `${progressPercent}%` }} />
          <div className="absolute top-[-30px] right-4 bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg text-[10px] font-black text-white opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
            {progressPercent}% Absolute Mastery
          </div>
        </div>
      </main>
    </div>
  );
}
