import { useEffect, useRef, useState } from "react";

type InterestVideoProps = {
    image: string;
    title: string;
    video: string;
};

function InterestVideo({ image, title, video }: InterestVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoVisible, setVideoVisible] = useState(false);
    const [videoReady, setVideoReady] = useState(false);
    const [hasEnded, setHasEnded] = useState(false);
    const [autoplayBlocked, setAutoplayBlocked] = useState(false);

    useEffect(() => {
        const timer = window.setTimeout(() => setVideoVisible(true), 1000);
        return () => window.clearTimeout(timer);
    }, []);

    const replay = () => {
        const player = videoRef.current;
        if (!player) return;

        player.currentTime = 0;
        setHasEnded(false);
        setVideoReady(true);
        setAutoplayBlocked(false);
        setVideoVisible(true);
        void player.play().catch(() => setAutoplayBlocked(true));
    };

    const startVideo = (player: HTMLVideoElement) => {
        setVideoReady(true);
        void player.play().catch(() => setAutoplayBlocked(true));
    };

    return (
        <div className={`interest-media${hasEnded ? " interest-media-ended" : ""}`}>
            <div className={`interest-media-frame${videoVisible && videoReady && !hasEnded ? " interest-media-video-active" : ""}`}>
                <img src={`${import.meta.env.BASE_URL}${image}`} alt={title} />

                {videoVisible && (
                    <video
                        ref={videoRef}
                        src={`${import.meta.env.BASE_URL}${video}`}
                        title={`${title} video`}
                        autoPlay
                        controls
                        playsInline
                        onCanPlay={(event) => startVideo(event.currentTarget)}
                        onPlay={() => setAutoplayBlocked(false)}
                        onEnded={() => setHasEnded(true)}
                    />
                )}
            </div>

            {(hasEnded || autoplayBlocked) && (
                <button className="interest-video-replay" onClick={replay}>
                    {hasEnded ? "Replay?" : "Play with audio"}
                </button>
            )}
        </div>
    );
}

export default InterestVideo;
