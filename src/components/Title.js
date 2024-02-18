import React, { useEffect, useState } from "react";

const TITLES = [
    "Start Socializing",
    "Make New Friends",
    "Chat any time"
];

const Title = () => {
    const [titleIndex, setTitleIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);
        
    useEffect(() => {
        const titleInterval = setInterval(() => {
            // Corrected: Directly update titleIndex without re-declaring it
            setTitleIndex((prevIndex) => (prevIndex + 1) % TITLES.length);
            setFadeIn(true);
            // Moved the fade out logic to setTimeout within setInterval
        }, 4000);

        // Corrected typo: setTimout -> setTimeout
        const timeout = setTimeout(() => {
            setFadeIn(false);
        }, 2000);

        return function cleanup() {
            clearInterval(titleInterval);
            clearTimeout(timeout);
        };
    // Removed titleIndex from dependency array to avoid re-running the effect unnecessarily
    }, [titleIndex]);

    return (
        <p className={fadeIn ? "title-fade-in" : "title-fade-out"}>{TITLES[titleIndex]}</p>
    );
}

export default Title;
