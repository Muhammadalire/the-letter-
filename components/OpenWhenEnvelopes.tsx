import React, { useState } from 'react';
import { Mail, X, Heart } from 'lucide-react';

interface EnvelopeData {
    id: number;
    label: string;
    color: string;
    message: string;
    image?: string;
}

const envelopes: EnvelopeData[] = [
    {
        id: 1,
        label: "Open when you're sad",
        color: "bg-wine-50 text-wine-900 border-wine-200",
        message: "Remember that you are the sun in my sky. Even on cloudy days, your light is still there. I love you so much and I'm always here for you."
    },
    {
        id: 2,
        label: "Open when you miss me",
        color: "bg-gold-50 text-wine-900 border-gold-200",
        message: "I miss you too! Probably more! Close your eyes and imagine I'm holding your hand right now. We'll see each other soon! 💕"
    },
    {
        id: 3,
        label: "Open when you're stressed",
        color: "bg-wine-50 text-wine-900 border-wine-200",
        message: "Take a deep breath. In... Out... You are capable, you are smart, and you've got this! Don't let the world overwhelm you. I am so proud of my strong girl!"
    },
    {
        id: 4,
        label: "Open when you need a laugh",
        color: "bg-gold-50 text-wine-900 border-gold-200",
        message: "Why did the scarecrow win an award? Because he was outstanding in his field! (Your smile is my favorite thing!)"
    }
];

const OpenWhenEnvelopes: React.FC = () => {
    const [selectedEnvelope, setSelectedEnvelope] = useState<EnvelopeData | null>(null);

    return (
        <section className="py-12 px-4 max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-heading text-wine-900 mb-4">Open When...</h2>
                <div className="w-16 h-0.5 bg-gold-400 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {envelopes.map((env) => (
                    <button
                        key={env.id}
                        onClick={() => setSelectedEnvelope(env)}
                        className={`${env.color} p-8 rounded-sm border transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-4 group cursor-pointer hover:-translate-y-1`}
                    >
                        <Mail className="w-8 h-8 opacity-80 group-hover:scale-110 transition-transform" />
                        <span className="font-heading text-xl">{env.label}</span>
                    </button>
                ))}
            </div>

            {/* Modal */}
            {selectedEnvelope && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wine-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="glass-card bg-white rounded-sm max-w-lg w-full p-10 relative shadow-2xl animate-pop-in border border-gold-200">
                        <button
                            onClick={() => setSelectedEnvelope(null)}
                            className="absolute top-4 right-4 text-wine-300 hover:text-wine-600 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="text-center mb-8">
                            <div className="inline-block p-3 rounded-full mb-4 border border-gold-300">
                                <Heart className="w-6 h-6 text-wine-700 fill-wine-700" />
                            </div>
                            <h3 className="text-2xl font-bold text-wine-900 font-heading">{selectedEnvelope.label}</h3>
                        </div>

                        <div className="space-y-6 text-center">
                            <p className="text-lg text-gray-700 leading-relaxed font-body italic">
                                "{selectedEnvelope.message}"
                            </p>

                            {selectedEnvelope.image && (
                                <div className="mt-6 overflow-hidden border-4 border-white shadow-md rotate-1">
                                    <img
                                        src={selectedEnvelope.image}
                                        alt="Surprise"
                                        className="w-full h-48 object-cover sepia-[.3]"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mt-10 text-center">
                            <button
                                onClick={() => setSelectedEnvelope(null)}
                                className="text-wine-600 font-bold hover:text-wine-800 text-sm tracking-widest uppercase border-b border-transparent hover:border-wine-800 transition-all"
                            >
                                Close Envelope
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default OpenWhenEnvelopes;
