import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import type { Interest } from "../data/interests";
import DancingStarHeading from "./DancingStarHeading";

type PolaroidProps = {
    interest: Interest;
    index: number;
    isActive: boolean;
    onOpen: () => void;
    onClose: () => void;
};

function Polaroid({interest, index, isActive, onOpen, onClose}: PolaroidProps) {
    const cardRef = useRef<HTMLElement | null>(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.2 });
    const [isHovered, setIsHovered] = useState(false);
    const [typedCategoryLength, setTypedCategoryLength] = useState(0);
    const [categoryText, setCategoryText] = useState(interest.title);

    useEffect(() => {
        if (!isHovered) return;

        const interval = window.setInterval(() => {
            setTypedCategoryLength((length) => {
                if (length >= categoryText.length) {
                    window.clearInterval(interval);
                    return length;
                }

                return length + 1;
            });
        }, 55);

        return () => window.clearInterval(interval);
    }, [isHovered, categoryText.length]);

    const startCategoryTyping = () => {
        const taglines = interest.taglines?.filter((tagline) => tagline.trim().length > 0) ?? [];
        const nextTagline = taglines.length
            ? taglines[Math.floor(Math.random() * taglines.length)]
            : interest.title;
        setCategoryText(nextTagline);
        setTypedCategoryLength(0);
        setIsHovered(true);
    };

    const stopCategoryTyping = () => {
        setIsHovered(false);
        setTypedCategoryLength(0);
    };

    return (
        <motion.article
            ref={cardRef}
            className={isActive ? "polaroid polaroid-active" : "polaroid"}
            onClick={isActive ? onClose : onOpen}
            onHoverStart={startCategoryTyping}
            onHoverEnd={stopCategoryTyping}
            onFocus={startCategoryTyping}
            onBlur={stopCategoryTyping}
            initial={{ opacity: 0, y: 50, scale: isActive ? 1.05 : 1 }}
            animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 50,
                scale: isActive ? 1.05 : 1,
            }}
            whileHover={{
                y: -8,
                rotate: 0,
                scale: isActive ? 1.075 : 1.025,
                transition: {
                    duration: 0.25,
                    ease: "easeOut",
                },
            }}
            role="button"
            tabIndex={0}
            transition={{
                opacity: { duration: 0.5, delay: index * 0.12 },
                y: { duration: 0.5, delay: index * 0.12, ease: "easeOut" },
                scale: { duration: 0.25 },
            }}
        >
            <div className="polaroid-inner">
                <div className="polaroid-front">
                    <img src={interest.image} alt="" />
                    <DancingStarHeading as="h3" className="polaroid-h3">{interest.title}</DancingStarHeading>
                    <span className={`polaroid-category${isHovered ? " polaroid-category-visible" : ""}`} aria-hidden="true">
                        {categoryText.slice(0, typedCategoryLength)}
                        <span className="polaroid-category-caret" />
                    </span>
                </div>

                <div className="polaroid-back">
                    <DancingStarHeading as="h3" className="polaroid-h3">{interest.title}</DancingStarHeading>
                    <p>{interest.description}</p>

                    {interest.link && (
                        <a href={interest.link}>
                            See the project â†’
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}

export default Polaroid;
