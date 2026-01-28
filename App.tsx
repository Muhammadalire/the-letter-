import React, { useState, useEffect, useRef } from 'react';
import FloatingHearts from './components/FloatingHearts';
import LoveLetterSection from './components/LoveLetterSection';
import OpenWhenEnvelopes from './components/OpenWhenEnvelopes';
import DoodleBoard from './components/DoodleBoard';
import ScavengerHunt from './components/ScavengerHunt';
import BackgroundMusic from './components/BackgroundMusic';
import { Music, Heart, BookOpen, Gamepad2, Tv, Palette, ArrowDown, Sparkles } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// More subtle data
const loveData = [
  { month: 'Aug', level: 999999 },
  { month: 'Sep', level: 999999 },
  { month: 'Oct', level: 999999 },
  { month: 'Nov', level: 999999 },
  { month: 'Dec', level: 999999 },
  { month: 'Jan', level: 999999 },
  { month: 'Feb', level: 999999 },
];

const App: React.FC = () => {
  const [showScrollHint, setShowScrollHint] = useState(true);
  const section1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setShowScrollHint(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToNext = () => {
    section1Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen pb-20 font-body text-gray-700">
      <BackgroundMusic />
      <FloatingHearts />

      {/* Header / Intro */}
      <header className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-8 opacity-80 animate-pulse-slow">
          <Sparkles className="w-16 h-16 text-gold-500" />
        </div>
        <h1 className="text-5xl md:text-8xl font-heading text-wine-900 mb-6 drop-shadow-sm tracking-tight">
          7 Months of Us
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mb-8"></div>
        <p className="text-xl md:text-2xl text-wine-800 font-light max-w-lg mb-12 italic">
          "In all the world, there is no heart for me like yours."
        </p>

        <button
          onClick={handleScrollToNext}
          className="group relative px-8 py-3 bg-wine-800 text-white rounded-full font-bold shadow-lg overflow-hidden transition-transform hover:scale-105"
        >
          <span className="relative z-10 flex items-center gap-2">
            Begin the Journey <ArrowDown size={18} />
          </span>
          <div className="absolute inset-0 bg-gold-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 space-y-32">

        {/* Section 1: The Muse */}
        <section ref={section1Ref} className="pt-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-wine-900 mb-4">The Muse</h2>
            <p className="text-gray-500 italic">I admire your arts</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-10 rounded-sm flex flex-col items-center text-center group hover:border-gold-300">
              <Palette className="w-12 h-12 text-wine-700 mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
              <h3 className="text-2xl font-bold text-wine-900 mb-4 font-heading">The Artist</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Your sketches aren't just drawings, they are windows into your beautiful mind. Every line you create captures a beauty which is cherished forever in my heart.
              </p>
            </div>

            <div className="glass-card p-10 rounded-sm flex flex-col items-center text-center group hover:border-gold-300">
              <Music className="w-12 h-12 text-wine-700 mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
              <h3 className="text-2xl font-bold text-wine-900 mb-4 font-heading">The Musician</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                The sound of your ukulele is the sweetest melody. It calms the storms and brings peace to my days, it warms my heart and melts me to core. Pair Ukulele with your voice and it's the most beautiful music I've ever heard.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Shared Moments (Text Only, Minimalist) */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-wine-900 mb-4">Our Moments</h2>
            <div className="w-16 h-0.5 bg-gold-400 mx-auto"></div>
          </div>

          <div className="space-y-8">
            <div className="glass-card p-8 rounded-sm border-l-4 border-l-wine-700 flex items-start gap-6 hover:translate-x-2 transition-transform">
              <Gamepad2 className="w-8 h-8 text-wine-600 shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-xl font-bold text-wine-900 mb-2">Roblox Adventures</h3>
                <p className="text-gray-600 font-light">
                  Each dress to impress show and cooking rush round is thhe sweetest time spent, I remember when we climed mountain together! the sweetest thing ever!!!
                </p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-sm border-l-4 border-l-wine-700 flex items-start gap-6 hover:translate-x-2 transition-transform">
              <Tv className="w-8 h-8 text-wine-600 shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-xl font-bold text-wine-900 mb-2">Rave & Watch Parties</h3>
                <p className="text-gray-600 font-light">
                  Boboiboy, movies, and late-evening streams. Even miles apart, watching with you is so lovely and time tends to move way more fast with you. I love our streams so much
                </p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-sm border-l-4 border-l-wine-700 flex items-start gap-6 hover:translate-x-2 transition-transform">
              <BookOpen className="w-8 h-8 text-wine-600 shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-xl font-bold text-wine-900 mb-2">Our Story Time</h3>
                <p className="text-gray-600 font-light">
                  Listening to you narrate stories with such excitement is a joy I cherish so much, I love the way you are excited when Ayako-San does something cool. Reading a story myself can never be as lovely!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chart Section - Redesigned */}
        <section className="py-12">
          <div className="glass-card p-8 rounded-sm">
            <h3 className="text-center text-2xl font-heading text-wine-800 mb-8">Love Over Time</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={loveData}>
                  <XAxis
                    dataKey="month"
                    stroke="#822020"
                    tick={{ fill: '#822020', fontSize: 12, fontFamily: 'Lato' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide domain={[0, 'dataMax + 100']} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #d0ab65',
                      borderRadius: '4px',
                      fontFamily: 'Lato'
                    }}
                    itemStyle={{ color: '#822020' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="level"
                    stroke="#b44040"
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#b44040', strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: '#d0ab65' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-xs text-gold-600 mt-4 tracking-widest uppercase">My Love Level: INFINITE</p>
          </div>
        </section>

        {/* Doodle Board */}
        <DoodleBoard />

        {/* Open When Envelopes */}
        <OpenWhenEnvelopes />

        {/* Scavenger Hunt Game Layer */}
        <ScavengerHunt />

        {/* Love Letter Section */}
        <section>
          <LoveLetterSection />
        </section>

        <footer className="h-24 flex items-center justify-center text-wine-300 text-sm">
          <Heart size={12} className="mx-2" />
          <span>Forever & Always</span>
          <Heart size={12} className="mx-2" />
        </footer>
      </main>
    </div>
  );
};

export default App;