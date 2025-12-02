import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import QuestBoard from './components/QuestBoard';
import Shop from './components/Shop';
import { AppView, Quest } from './types';

// Default initial quests
const INITIAL_QUESTS: Quest[] = [
  { id: 1, title: '창문 열고 환기하기', description: '5분 동안 신선한 공기를 마셔보세요.', isCompleted: false, xp: 10 },
  { id: 2, title: '물 한 잔 마시기', description: '일어나자마자 미지근한 물 한 잔.', isCompleted: false, xp: 10 },
  { id: 3, title: '좋아하는 노래 1곡 듣기', description: '오늘의 추천 노래도 좋아요.', isCompleted: false, xp: 10 },
  { id: 4, title: '5분간 산책하기', description: '집 앞 편의점이라도 괜찮아요.', isCompleted: false, xp: 20 },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [credits, setCredits] = useState<number>(0);
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [hasClaimedWeekly, setHasClaimedWeekly] = useState<boolean>(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedCredits = localStorage.getItem('stepout_credits');
    const savedQuests = localStorage.getItem('stepout_quests');
    const savedClaimed = localStorage.getItem('stepout_claimed');

    if (savedCredits) setCredits(parseInt(savedCredits, 10));
    if (savedQuests) setQuests(JSON.parse(savedQuests));
    if (savedClaimed) setHasClaimedWeekly(JSON.parse(savedClaimed));
  }, []);

  // Save state whenever it changes
  useEffect(() => {
    localStorage.setItem('stepout_credits', credits.toString());
    localStorage.setItem('stepout_quests', JSON.stringify(quests));
    localStorage.setItem('stepout_claimed', JSON.stringify(hasClaimedWeekly));
  }, [credits, quests, hasClaimedWeekly]);

  const toggleQuest = (id: number) => {
    setQuests(prev => prev.map(q => 
      q.id === id ? { ...q, isCompleted: !q.isCompleted } : q
    ));
  };

  const claimWeeklyReward = () => {
    const allCompleted = quests.every(q => q.isCompleted);
    if (allCompleted && !hasClaimedWeekly) {
      setCredits(prev => prev + 500);
      setHasClaimedWeekly(true);
      // Confetti effect logic could go here
    }
  };

  const spendCredits = (amount: number): boolean => {
    if (credits >= amount) {
      setCredits(prev => prev - amount);
      return true;
    }
    return false;
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard />;
      case AppView.QUESTS:
        return (
          <QuestBoard 
            quests={quests} 
            toggleQuest={toggleQuest} 
            claimWeeklyReward={claimWeeklyReward}
            hasClaimedReward={hasClaimedWeekly}
          />
        );
      case AppView.SHOP:
        return <Shop credits={credits} spendCredits={spendCredits} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative overflow-hidden">
        {/* Top Decorative Blob */}
        <div className="absolute top-[-100px] right-[-100px] w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>
        <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>

        {/* Content Area */}
        <main className="p-6 relative z-10 min-h-screen">
          {renderView()}
        </main>
        
        {/* Navigation */}
        <Navigation currentView={currentView} setView={setCurrentView} />
      </div>
    </div>
  );
};

export default App;