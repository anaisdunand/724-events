import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [showStatus, setShowStatus] = useState(false);

    const { data } = useData();
    const byDateDesc = data?.focus || [];
    byDateDesc.sort((a, b) => new Date(b.date) - new Date(a.date));

    const nextCard = () => {
        setIndex(prev => (prev + 1) % byDateDesc.length);
    };
    const showCurrentStatus = () => {
        setShowStatus(true);
        setTimeout(() => setShowStatus(false), 1000);
    };
    const handleDotClick = (idx) => {
        setIndex(idx);
        if (!isPaused) {
            setIsPaused(true);
            setTimeout(() => showCurrentStatus(), 1000);
        };
    };

    useEffect(() => {
        if (isPaused) return undefined;
        const timer = setTimeout(nextCard, 4900);
        return () => clearTimeout(timer);
    }, [index, isPaused, byDateDesc]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            const tag = event.target.tagName;
            const isTyping = tag === "INPUT" || tag === "TEXTAREA";

            if (isTyping) return;

            if (event.code === "Space") {
                event.preventDefault();
                setIsPaused((prev) => !prev);
                showCurrentStatus();
            };
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="SlideCardList">
            {byDateDesc.map((event, idx) => (
                <div
                    key={`${event.name} - ${event.date}`}
                    className={`SlideCard SlideCard--${
                        index === idx ? "display" : "hide"
                    }`}
                    data-testid="slide-card"
                >
                    <img src={event.cover} alt={`Slide ${idx + 1}`} />
                    <div className="SlideCard__descriptionContainer">
                        <div className="SlideCard__description">
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <div>{getMonth(new Date(event.date))}</div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="SlideCard__paginationContainer">
                <div className="SlideCard__pagination">
                    {Array.from({ length: byDateDesc.length }, (_, idx) => (
                        <input
                            key={`radio-${idx}`}
                            type="radio"
                            name="radio-button"
                            checked={index === idx}
                            onChange={() => handleDotClick(idx)}
                            readOnly
                        />
                    ))}
                </div>
            </div>
            {showStatus && (
                <div className="SlideCard__popup" data-testid="popup">
                    {isPaused ? "I I" : "⯈"}
                </div>
            )}
        </div>
    );
};

export default Slider;