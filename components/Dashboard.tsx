import React, { useEffect, useState } from 'react';
import { DailyContent } from '../types';
import { fetchDailyContent } from '../services/geminiService';
import { Music, Quote, Loader2, PlayCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [content, setContent] = useState<DailyContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      // Try to get cached content for today to save API calls
      const today = new Date().toDateString();
      const cached = localStorage.getItem('dailyContent');
      const cachedDate = localStorage.getItem('dailyContentDate');

      if (cached && cachedDate === today) {
        setContent(JSON.parse(cached));
        setLoading(false);
      } else {
        const newContent = await fetchDailyContent();
        setContent(newContent);
        localStorage.setItem('dailyContent', JSON.stringify(newContent));
        localStorage.setItem('dailyContentDate', today);
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <Loader2 className="animate-spin text-indigo-500" size={48} />
        <p className="text-slate-500 text-sm animate-pulse">오늘의 마음을 읽어오고 있어요...</p>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">반가워요. 👋</h1>
        <p className="text-slate-500">오늘도 작은 한 걸음을 내디뎌 볼까요?</p>
      </header>

      {/* Quote Card */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-20">
            <Quote size={80} />
        </div>
        <div className="relative z-10">
            <div className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full inline-block mb-4">오늘의 문구</div>
            <p className="text-xl font-medium leading-relaxed mb-4">"{content.quote}"</p>
            <p className="text-right text-indigo-100 font-medium">- {content.author}</p>
        </div>
      </div>

      {/* Music Recommendation Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-4">
            <Music className="text-rose-500" size={20} />
            <h2 className="font-bold text-slate-800">오늘의 추천 노래</h2>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
            <div className="h-16 w-16 bg-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <Music className="text-slate-400" size={32} />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800 truncate">{content.songTitle}</h3>
                <p className="text-slate-500 text-sm truncate">{content.songArtist}</p>
            </div>
            <a 
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${content.songArtist} ${content.songTitle}`)}`}
                target="_blank"
                rel="noreferrer"
                className="text-rose-500 hover:text-rose-600 transition-colors"
            >
                <PlayCircle size={32} />
            </a>
        </div>
        <p className="mt-3 text-sm text-slate-600 bg-rose-50 p-3 rounded-lg">
            💡 {content.songReason}
        </p>
      </div>

       {/* Simple encouragement */}
       <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="font-bold text-blue-900 mb-2">쉬어가도 괜찮아요</h3>
          <p className="text-sm text-blue-800 leading-relaxed">
            아무것도 하지 않은 것 같아 불안한가요? 휴식은 도약을 위한 가장 중요한 준비 과정입니다. 
            스스로를 너무 몰아세우지 마세요. 당신은 충분히 잘하고 있습니다.
          </p>
       </div>
    </div>
  );
};

export default Dashboard;