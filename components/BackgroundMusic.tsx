import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        // Create audio element programmatically if not using JSX for it
        if (!audioRef.current) {
            audioRef.current = new Audio('/song.webm');
            audioRef.current.loop = true;
            audioRef.current.volume = 1.0; // Increased to 100% volume
        }

        const handleInteraction = () => {
            console.log("Interaction detected! Attempting playback...");
            if (audioRef.current && !isPlaying) {
                // Try to play
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log("Audio playback started successfully!");
                            setIsPlaying(true);
                            // Cleanup listeners
                            removeListeners();
                        })
                        .catch(err => {
                            console.error("Playback failed (likely browser policy):", err);
                        });
                }
            }
        };

        const addListeners = () => {
            document.addEventListener('click', handleInteraction);
            document.addEventListener('touchstart', handleInteraction);
            document.addEventListener('scroll', handleInteraction); // Added scroll trigger
            document.addEventListener('keydown', handleInteraction); // Added keydown trigger
        };

        const removeListeners = () => {
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('touchstart', handleInteraction);
            document.removeEventListener('scroll', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
        };

        // Listen for ANY interaction on the page
        addListeners();

        return () => {
            removeListeners();
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []); // Removed isPlaying dependency to avoid re-running effect logic continuously

    const togglePlayMute = () => {
        if (!audioRef.current) return;

        if (!isPlaying) {
            // Manual start if autoplay failed or hasn't happened yet
            audioRef.current.play().then(() => setIsPlaying(true));
        } else {
            // Toggle mute if already playing
            audioRef.current.muted = !audioRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <button
            onClick={togglePlayMute}
            className="fixed bottom-4 right-4 z-50 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-wine-200 text-wine-800 hover:bg-wine-50 transition-all animate-bounce-slow"
            aria-label={!isPlaying ? "Play music" : (isMuted ? "Unmute music" : "Mute music")}
        >
            {!isPlaying ? (
                <Volume2 size={20} className="opacity-50" /> // Show play/volume icon if not playing to encourage click
            ) : (
                isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />
            )}
        </button>
    );
};

export default BackgroundMusic;
