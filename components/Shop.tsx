import React, { useState } from 'react';
import { Coupon } from '../types';
import { ShoppingBag, MapPin, Ticket, Coffee, BookOpen, Film } from 'lucide-react';

interface ShopProps {
  credits: number;
  spendCredits: (amount: number) => boolean;
}

const coupons: Coupon[] = [
  { 
    id: 'c1', 
    name: '아메리카노 1잔', 
    cost: 300, 
    description: '동네 카페에서 따뜻한 커피 한 잔 어때요?', 
    icon: 'coffee',
    color: 'bg-amber-100 text-amber-700'
  },
  { 
    id: 'c2', 
    name: '서점 5천원 상품권', 
    cost: 500, 
    description: '서점의 조용한 분위기를 느껴보세요.', 
    icon: 'book',
    color: 'bg-emerald-100 text-emerald-700'
  },
  { 
    id: 'c3', 
    name: '영화 관람권', 
    cost: 1000, 
    description: '혼영도 좋고, 친구와 함께라도 좋아요.', 
    icon: 'movie',
    color: 'bg-rose-100 text-rose-700'
  },
  { 
    id: 'c4', 
    name: '편의점 3천원권', 
    cost: 200, 
    description: '가볍게 산책하며 간식을 사러 가요.', 
    icon: 'store',
    color: 'bg-blue-100 text-blue-700'
  },
];

const Shop: React.FC<ShopProps> = ({ credits, spendCredits }) => {
  const [purchasedCoupon, setPurchasedCoupon] = useState<Coupon | null>(null);

  const handleBuy = (coupon: Coupon) => {
    if (credits >= coupon.cost) {
        if(confirm(`${coupon.name}을(를) 구매하시겠습니까?`)) {
            const success = spendCredits(coupon.cost);
            if (success) {
                setPurchasedCoupon(coupon);
            }
        }
    } else {
        alert("크레딧이 부족합니다. 퀘스트를 완료해보세요!");
    }
  };

  const closeModal = () => setPurchasedCoupon(null);

  const getIcon = (type: string) => {
      switch(type) {
          case 'coffee': return <Coffee />;
          case 'book': return <BookOpen />;
          case 'movie': return <Film />;
          default: return <Ticket />;
      }
  }

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      <header className="flex justify-between items-center sticky top-0 bg-[#f8fafc]/90 backdrop-blur-sm py-2 z-10">
        <div>
            <h1 className="text-2xl font-bold text-slate-800">상점</h1>
            <p className="text-slate-500">세상 밖으로 나갈 준비물.</p>
        </div>
        <div className="bg-slate-800 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
            {credits} C
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {coupons.map((coupon) => (
            <div key={coupon.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${coupon.color}`}>
                    {getIcon(coupon.icon)}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800">{coupon.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{coupon.description}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs font-medium text-slate-400">
                        <MapPin size={12} /> 오프라인 사용 전용
                    </div>
                </div>
                <button 
                    onClick={() => handleBuy(coupon)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors whitespace-nowrap ${
                        credits >= coupon.cost 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200' 
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                >
                    {coupon.cost} C
                </button>
            </div>
        ))}
      </div>

      {/* Purchase Modal */}
      {purchasedCoupon && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center relative shadow-2xl transform transition-all scale-100">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-bounce">
                    <Ticket size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">구매 완료!</h2>
                <p className="text-slate-600 mb-6">
                    <span className="font-bold text-indigo-600">{purchasedCoupon.name}</span> 쿠폰이 발급되었습니다.<br/>
                    <span className="text-sm mt-2 block text-slate-400">이제 밖으로 나가서 사용해볼까요?</span>
                </p>
                
                <div className="bg-slate-100 p-4 rounded-xl border-dashed border-2 border-slate-300 mb-6">
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Coupon Code</p>
                    <p className="text-xl font-mono font-bold text-slate-700 tracking-wider">STEP-OUT-{Math.floor(Math.random() * 9000) + 1000}</p>
                </div>

                <button 
                    onClick={closeModal}
                    className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-colors"
                >
                    확인
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Shop;