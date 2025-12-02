import React from 'react';
import { Quest } from '../types';
import { CheckCircle2, Circle, Gift } from 'lucide-react';

interface QuestBoardProps {
  quests: Quest[];
  toggleQuest: (id: number) => void;
  claimWeeklyReward: () => void;
  hasClaimedReward: boolean;
}

const QuestBoard: React.FC<QuestBoardProps> = ({ quests, toggleQuest, claimWeeklyReward, hasClaimedReward }) => {
  const completedCount = quests.filter(q => q.isCompleted).length;
  const progress = (completedCount / quests.length) * 100;
  const allCompleted = completedCount === quests.length;

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">주간 퀘스트</h1>
        <p className="text-slate-500">작은 성공들이 모여 큰 변화를 만듭니다.</p>
      </header>

      {/* Progress Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-medium text-slate-500">진행도</span>
            <span className="text-2xl font-bold text-indigo-600">{completedCount}/{quests.length}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div 
                className="bg-indigo-500 h-full transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress}%` }}
            />
        </div>
        {allCompleted && !hasClaimedReward && (
            <button 
                onClick={claimWeeklyReward}
                className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all animate-bounce"
            >
                <Gift size={20} />
                보상 받기 (500 크레딧)
            </button>
        )}
        {hasClaimedReward && (
             <div className="mt-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg text-center font-medium">
                🎉 이번 주 보상을 획득했습니다! 다음 주를 기대해주세요.
             </div>
        )}
      </div>

      {/* Quest List */}
      <div className="space-y-3">
        {quests.map((quest) => (
            <div 
                key={quest.id}
                onClick={() => !hasClaimedReward && toggleQuest(quest.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${
                    quest.isCompleted 
                        ? 'bg-slate-50 border-slate-200 opacity-60' 
                        : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'
                }`}
            >
                <div className={`transition-colors ${quest.isCompleted ? 'text-green-500' : 'text-slate-300'}`}>
                    {quest.isCompleted ? <CheckCircle2 size={28} /> : <Circle size={28} />}
                </div>
                <div className="flex-1">
                    <h3 className={`font-medium text-lg ${quest.isCompleted ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                        {quest.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{quest.description}</p>
                </div>
                {/* <div className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded">
                    +XP
                </div> */}
            </div>
        ))}
      </div>

      <div className="text-center text-xs text-slate-400 mt-8">
        매주 월요일 0시에 퀘스트가 초기화됩니다.
      </div>
    </div>
  );
};

export default QuestBoard;