import React, { useRef, useState, useEffect } from 'react';
import { Palette, Undo, Check, Trash2 } from 'lucide-react';

const DoodleBoard: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#b44040'); // Wine 500
    const [submitted, setSubmitted] = useState(false);

    // Setup canvas resolution for high DPI displays
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // Set actual size in memory (scaled to account for extra pixel density)
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.scale(dpr, dpr);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = 3;
            // Fill white background
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, rect.width, rect.height);
        }
    }, []);

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDrawing(true);
        const { offsetX, offsetY } = getCoordinates(e);
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(offsetX, offsetY);
            ctx.strokeStyle = color;
        }
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = getCoordinates(e);
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) ctx.closePath();
    };

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { offsetX: 0, offsetY: 0 };

        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const rect = canvas.getBoundingClientRect();
        return {
            offsetX: clientX - rect.left,
            offsetY: clientY - rect.top
        };
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
        }
    };

    const handleSubmit = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const image = canvas.toDataURL('image/jpeg', 0.6);
        setSubmitted(true);

        try {
            // Call Vercel Serverless Function
            const functionUrl = '/api/send-doodle';

            await fetch(functionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image }),
            });
            console.log('Doodle sent to cloud!');
        } catch (error) {
            console.error('Failed to send doodle:', error);
        }
    };

    const colors = [
        '#b44040', // Wine
        '#d0ab65', // Gold
        '#4a4a4a', // Gray
        '#e11d48', // Rose
        '#1d4ed8', // Blue
        '#047857', // Green
    ];

    return (
        <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <div className="mb-8">
                    <h2 className="text-4xl font-heading text-wine-900 mb-4">Doodle For Me</h2>
                    <p className="text-gray-600 italic">Leaves a little masterpiece behind...</p>
                    <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4"></div>
                </div>

                {!submitted ? (
                    <div className="glass-card p-6 rounded-sm max-w-xl mx-auto border-2 border-gold-200">
                        <canvas
                            ref={canvasRef}
                            className="w-full h-80 bg-white cursor-crosshair touch-none border shadow-inner rounded-sm mb-4"
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                            style={{ width: '100%', height: '320px' }}
                        />

                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex gap-2">
                                {colors.map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setColor(c)}
                                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? 'border-gray-800 scale-110' : 'border-transparent'}`}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={clearCanvas}
                                    className="p-2 text-gray-500 hover:text-wine-600 transition-colors"
                                    title="Clear"
                                >
                                    <Trash2 size={20} />
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="px-6 py-2 bg-wine-700 text-white rounded-full font-bold shadow-md hover:bg-wine-800 transition-colors flex items-center gap-2"
                                >
                                    <Check size={18} /> Send to My Heart
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="glass-card p-12 rounded-sm max-w-xl mx-auto animate-fade-in border border-gold-300">
                        <div className="mb-6 flex justify-center">
                            <Palette className="w-16 h-16 text-wine-600" />
                        </div>
                        <h3 className="text-3xl font-heading text-wine-900 mb-4">I Love Your Art!</h3>
                        <p className="text-gray-600 text-lg">
                            Even your simplest doodle is a masterpiece to me. I've saved it in my heart forever.
                        </p>
                        <button
                            onClick={() => { setSubmitted(false); setTimeout(clearCanvas, 10); }}
                            className="mt-8 text-gold-600 hover:text-gold-700 underline font-bold"
                        >
                            Draw Another
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DoodleBoard;
