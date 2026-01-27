import React, { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

const LoveLetterSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        const element = document.getElementById('love-letter-section');
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, []);

    return (
        <section id="love-letter-section" className="py-20 px-4 flex flex-col items-center">
            <div
                className={`max-w-2xl w-full transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
            >
                <div className="relative bg-[#fffdfa] p-10 md:p-16 rounded-sm shadow-2xl border border-[#e8dfd0] overflow-hidden">
                    {/* Paper Texture Overlay */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')]"></div>

                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-wine-50/50 -rotate-45 translate-x-16 -translate-y-16"></div>

                    {/* Wax Seal Placeholder Style */}
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-wine-800 rounded-full flex items-center justify-center shadow-lg transform -rotate-12 border-4 border-wine-900/20">
                        <Heart className="text-white w-10 h-10 fill-current opacity-90" />
                    </div>

                    <div className="relative z-10 font-body text-gray-800 leading-relaxed space-y-6">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-3xl font-heading text-wine-900">My Precious Angel,</h3>
                            <Sparkles className="text-gold-400 w-6 h-6 animate-pulse" />
                        </div>

                        <p className="text-lg italic text-gray-700">
                            Happy 7 months, my love. I am writing this with my heart full of love and my mind remembering you.
                            I am so grateful for the journey we have been on, and I am so excited to see where it takes us next.
                        </p>

                        <p className="text-lg text-gray-700">
                            You have become such an integral part of me, my love. My day starts with seeing your texts, reading your sweet messages and getting so much love and giving so much too.I am grateful for you, for your love and for you care. I never thought I will meet someone like you, someone who understands me so well, matches so well and loves me so well.
                            Meeting with you has transformed my life, my life is not the same black and white book, you made it a wonderful novel with so many emotions and feelings and colors. I remember using two emojis for everything, the crying and the skull one but ever since I met you I have been using so many and actually expressing more. Its not a big detail, right? But it is for me. I never thought I'd meet someone with who I can be this happy with and this open with. It may be a small change in me, but it shows much more.

                        </p>

                        <p className="text-lg text-gray-700">
                            I admire you, I admire you so much. You have got such a beautiful soul afterall. This soul loves me so much and so deep. This beautiful person reminds me to make sure to write motivation letter, asks me to make dua and take care of myself. This poetically pretty girl asks me if I have eaten yet, oh and if I changed clothes after uni. All these things are just lovely,no? Ti be cared for and to be loved is such a lovely feeling and such a lovely emotion. To be loved by you is so beautiful.

                        </p>

                        <p className="text-lg text-gray-700">
                            And then there are our roblox and rave dates, well now switiching to out own little mini site. These dates are always so lovely and so fun! okay not me almost burning the kitchen but so FUN! and hey I cheer so hard when you are playing racket rivals!!! SO yes getting back on topic, these dates are always so fun and I really look forward to when we will be doing irl dates, going to random cat cafes together, going on shopping and maybe cosplaying together as well. It will be so lovely, it is so lovely. Everything with you is so lovely, not just dates but normal days and moments are so special as well. No moment with you is boring, every second contains a different charm a different feeling.
                        </p>
                        <p className="text-lg text-gray-700">
                            And how can we end the letter without going over your breath-taking appereance. You are just so beautiful, so beautiful. My heart loves your beauty. Its the way your face changes when you see something. like how it goes excited or how your eyes show 'ugh I dont like this'. Its so so expressive and so adorable. the way your eyes smile and the way your eyes shine when you are happy. Its a whole different feeling, its like I'm standing in front a beautiful galaxy, admiring each and every bit. The way your cheeks puff up and the way your teeth are so beautiful and pretty. The way you walk is so extremely beautiful and even the lazy exhausted walk is beyond beyond adorable. I remember when you sent me video of you walking and I was getting so much cute agression!

                        </p>

                        <p className="text-lg text-gray-700">
                            My heart is full of love for you, full of sweet feelings and care for you. If I could continue typing, it'd take eternity for me to finish describing how much I love you how much I adore you. This world has so many beautiful sights but for me you, my Khumaira, are the most beautiful sight. Your beauty radiates deeply from your soul. your heart carries a beautiful glow which beautifies the one around you as well. Your warmth has that sweet comfort which puts my heart at peace and makes it feel loved, and I am so sure every one around you feels the same. I am so grateful to be with you!
                        </p>

                        <p className="text-lg text-gray-700">
                            I pray for us, I pray for both of us to achieve our dreams and we always love weach other and that we are always happy and healthy. And that may Allah fill our hearts with His thoughts and blesses us and our families with all his blessings and love. That He always protects us and our smiles, that He always blesses us with success and happiness. That we never fight but if we do, we solve it with love and gentlnesses. I pray that Allah ties me forever with you in the halal bond. That Allah makes me your leader, your imam, your husband, the one who takes so much care of you and loves you so much. I pray that Allah makes you my wife, my life partner and my princess, my caring and loving partner who takes so much care of me and loves me so much
                        </p>
                        <p className="text-lg text-gray-700">
                            I love you so much, I love us so much!
                        </p>

                        <div className="pt-12 flex flex-col items-end">
                            <p className="text-sm text-gray-500 mb-2 italic">With all my love, forever,</p>
                            <p className="text-3xl font-heading text-wine-800">Your Sweet Lover </p>
                        </div>
                    </div>
                </div>

                {/* Floating Accent */}
                <div className="mt-8 text-center animate-bounce">
                    <Heart className="w-6 h-6 text-wine-300 mx-auto fill-wine-100" />
                </div>
            </div>
        </section>
    );
};

export default LoveLetterSection;
