import React, { useState, useEffect } from 'react';
import { Cat, Paintbrush, Music, Heart, Star, Coffee, Sparkles } from 'lucide-react';

declare var confetti: any;

const ScavengerHunt: React.FC = () => {
    const [foundCount, setFoundCount] = useState(0);
    const [foundIds, setFoundIds] = useState<number[]>([]);
    const [showWonMessage, setShowWonMessage] = useState(false);

    // Items to find - positioned absolutely relative to the document
    // We'll insert them into the body via portal or just rendering them here with fixed positions for simplicity in this task
    // But fixed positions are tricky over long pages. 
    // BETTER STRATEGY: Render them in the main component flow but absolutely positioned within widely spaced container, 
    // OR create a container that spans the whole document height.
    // For specific placement, we'll put them in fixed places in the App layout.

    // Actually, to keep it clean, let's just make this a game state manager and render the items via a portal or just fixed overlays that show up as you scroll.
    // Simpler approach: scatter them in this component which we place at the root, and use 'top' percentages.

    const items = [
        { id: 1, icon: <Cat size={20} />, top: '15%', left: '5%', color: 'text-gray-600', label: 'Stray Cat' },
        { id: 2, icon: <Paintbrush size={20} />, top: '35%', right: '8%', color: 'text-wine-600', label: 'Lost Brush' },
        { id: 3, icon: <Music size={20} />, top: '55%', left: '10%', color: 'text-gold-600', label: 'Hidden Note' },
        { id: 4, icon: <Coffee size={20} />, top: '75%', right: '15%', color: 'text-stone-600', label: 'Morning Coffee' },
        { id: 5, icon: <Star size={20} />, top: '25%', left: '80%', color: 'text-yellow-500', label: 'Wish' },
        { id: 6, icon: <Heart size={20} />, top: '85%', left: '50%', color: 'text-wine-400', label: 'My Heart' },
        { id: 7, icon: <Sparkles size={20} />, top: '92%', left: '20%', color: 'text-blue-400', label: 'Magic' },
    ];

    const handleItemClick = (id: number) => {
        if (foundIds.includes(id)) return;

        const newFound = [...foundIds, id];
        setFoundIds(newFound);
        setFoundCount(prev => prev + 1);

        // Mini confetti for each find
        confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.6 } // Approx click position would be better but simple center is fine
        });

        if (newFound.length === items.length) {
            setTimeout(() => {
                setShowWonMessage(true);
                handleWin();
            }, 500);
        }
    };

    const handleWin = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    if (showWonMessage) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
                <div className="bg-white p-10 rounded-sm shadow-2xl max-w-lg text-center border-4 border-gold-300">
                    <h2 className="text-4xl font-heading text-wine-900 mb-4">You Found Everything! 🎉</h2>
                    <p className="text-gray-700 text-lg mb-8">
                        Just like you found your way into my heart and explored every corner of it.
                        There is no hiding from your love!
                    </p>
                    <p className="text-xl font-bold text-wine-600 mb-8">Secret Code: CUTIE-7-MONTHS</p>
                    <button
                        onClick={() => setShowWonMessage(false)}
                        className="px-8 py-3 bg-wine-700 text-white rounded-full font-bold hover:bg-wine-800 transition-colors"
                    >
                        Yay!
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Status Indicator */}
            <div className="fixed bottom-6 right-6 z-40 bg-white/90 backdrop-blur border border-wine-200 px-4 py-2 rounded-full shadow-lg flex items-center gap-3">
                <span className="text-wine-800 font-bold font-heading">Scavenger Hunt</span>
                <div className="bg-wine-100 text-wine-800 px-2 py-0.5 rounded-full text-sm font-bold">
                    {foundCount} / {items.length}
                </div>
            </div>

            {/* Hidden Items Layer - We use a portal-like approach by just rendering them fixed but with logic to place them 'essentially' on the page */}
            {/* Since 'absolute' positioning relates to the nearest positioned ancestor, if we put this in App which is relative, these will be absolute to App 
                App has min-h-screen, but grows. So top % works relative to total height. Good.
            */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                {items.map((item) => (
                    !foundIds.includes(item.id) && (
                        <div
                            key={item.id}
                            className={`absolute cursor-pointer pointer-events-auto transition-transform hover:scale-150 animate-pulse-slow ${item.color}`}
                            style={{
                                top: item.top,
                                left: item.left,
                                right: item.right
                            }}
                            onClick={() => handleItemClick(item.id)}
                            title={`Found a ${item.label}?`}
                        >
                            {item.icon}
                        </div>
                    )
                ))}
            </div>
        </>
    );
};

export default ScavengerHunt;
