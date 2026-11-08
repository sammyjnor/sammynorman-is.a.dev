import { motion } from "motion/react";
import { useEffect, useState } from "react";

const typingInterval = 105;
const greeting = "Hi, I'm";
const name = "Sammy!";
const headingLength = greeting.length + name.length;
const smiley = " :)";
const landingBurstStars = [
    { side: "left", color: "var(--sky)", x: -26, y: -12, size: 18 },
    { side: "left", color: "var(--berry)", x: -44, y: 3, size: 14 },
    { side: "left", color: "var(--cream)", x: -60, y: -6, size: 10 },
    { side: "right", color: "var(--berry)", x: 26, y: -10, size: 14 },
    { side: "right", color: "var(--cream)", x: 44, y: 7, size: 18 },
    { side: "right", color: "var(--sky)", x: 60, y: -3, size: 10 },
];

const sillyBottomLines = ["Sammy! :O", "awesome", "Sammy...?", "Jane Jane", "Sam I Am!", "Ms. Norman", "techy", "DJ Whoopie", "Sammy! ;)", "Sammy!?!?", "Sammy! :-)", "a robot?", "Silly", "S-A-M-M-Y!", "Sammyyyy", "So Cool", "Rad"];

function Landing() {
    const [typedCount, setTypedCount] = useState(() => {
        if (typeof window === "undefined") return headingLength;
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? headingLength : 1;
    });
    const [extraExclamationCount, setExtraExclamationCount] = useState(0);
    const [smileyCount, setSmileyCount] = useState(0);
    const [rotatingLine, setRotatingLine] = useState<string | null>(null);
    const displayedBottomLine = rotatingLine ?? (
        [...name].slice(0, Math.max(0, typedCount - greeting.length)).join("") +
        "!".repeat(extraExclamationCount) +
        [...smiley].slice(0, smileyCount).join("")
    );

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const timers: number[] = [];
        const schedule = (callback: () => void, delay: number) => {
            timers.push(window.setTimeout(callback, delay));
        };

        for (let count = 2; count <= headingLength; count += 1) {
            schedule(() => setTypedCount(count), (count - 1) * typingInterval);
        }

        const extrasStart = (headingLength - 1) * typingInterval + 240;
        for (let count = 1; count <= 3; count += 1) {
            schedule(() => setExtraExclamationCount(count), extrasStart + (count - 1) * typingInterval);
        }

        const backspaceStart = extrasStart + 3 * typingInterval + 240;
        for (let count = 2; count >= 0; count -= 1) {
            schedule(() => setExtraExclamationCount(count), backspaceStart + (2 - count) * 75);
        }

        const smileyStart = backspaceStart + 2 * 75 + 280;
        for (let count = 1; count <= smiley.length; count += 1) {
            schedule(() => setSmileyCount(count), smileyStart + (count - 1) * typingInterval);
        }

        const smileyBackspaceStart = smileyStart + smiley.length * typingInterval + 300;
        for (let count = smiley.length - 1; count >= 0; count -= 1) {
            schedule(() => setSmileyCount(count), smileyBackspaceStart + (smiley.length - 1 - count) * 55);
        }

        let currentLine = "";
        const scheduleNextLine = () => {
            schedule(() => {
                const alternatives = sillyBottomLines.filter((line) => line !== currentLine);
                const nextLine = alternatives[Math.floor(Math.random() * alternatives.length)] ?? sillyBottomLines[0];
                let sharedPrefixLength = 0;
                while (
                    sharedPrefixLength < currentLine.length &&
                    sharedPrefixLength < nextLine.length &&
                    currentLine[sharedPrefixLength] === nextLine[sharedPrefixLength]
                ) {
                    sharedPrefixLength += 1;
                }

                const typeNextCharacter = (index: number) => {
                    if (index >= nextLine.length) {
                        scheduleNextLine();
                        return;
                    }

                    currentLine += nextLine[index];
                    setRotatingLine(currentLine);
                    schedule(() => typeNextCharacter(index + 1), typingInterval);
                };

                const eraseCurrentLine = () => {
                    if (currentLine.length <= sharedPrefixLength) {
                        typeNextCharacter(sharedPrefixLength);
                        return;
                    }

                    currentLine = currentLine.slice(0, -1);
                    setRotatingLine(currentLine);
                    schedule(eraseCurrentLine, 55);
                };

                eraseCurrentLine();
            }, 4000 + Math.random() * 3000);
        };

        const initialLine = name;
        const rotationStart = smileyBackspaceStart + (smiley.length - 1) * 55 + 150;
        schedule(() => {
            currentLine = initialLine;
            setRotatingLine(initialLine);
            scheduleNextLine();
        }, rotationStart);

        return () => timers.forEach(window.clearTimeout);
    }, []);

    return (
        <section className="landing">
            <motion.div
                className="landing-text"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.7, delay: 0.2}}
            >
                <div className="heading-burst">
                    <h1 className="landing-heading landing-heading-typing" aria-label={`Hi, I'm ${displayedBottomLine}`}>
                        <span className="typing-line" aria-hidden="true">
                            {landingBurstStars.map((star, index) => (
                                <motion.span
                                    key={`landing-star-${index}`}
                                    className={`landing-burst-star${typedCount >= greeting.length ? " landing-burst-star-active" : ""}`}
                                    initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
                                    animate={typedCount >= greeting.length
                                        ? { opacity: 1, scale: 1, x: star.x, y: star.y }
                                        : { opacity: 0, scale: 0.2, x: 0, y: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 15,
                                        delay: index * 0.07,
                                    }}
                                    style={{
                                        color: star.color,
                                        fontSize: star.size,
                                        left: star.side === "left" ? 0 : "auto",
                                        right: star.side === "right" ? 0 : "auto",
                                        animationDelay: `${550 + index * 70}ms`,
                                        animationDuration: `${1.8 + (index % 3) * 0.35}s`,
                                    }}
                                    aria-hidden="true"
                                >
                                    <svg viewBox="0 0 200 200">
                                        <path
                                            d="M100 12 Q103 10 105 17 L125 65 Q127 70 133 70 L184 74 Q193 75 187 82 L148 115 Q144 119 146 125 L158 175 Q160 184 152 179 L106 153 Q100 150 94 153 L48 179 Q40 184 42 175 L54 125 Q56 119 52 115 L13 82 Q7 75 16 74 L67 70 Q73 70 75 65 L95 17 Q97 10 100 12 Z"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </motion.span>
                            ))}
                            {[...greeting].map((character, index) => (
                                <span
                                    className={index < typedCount ? "typing-character typed" : "typing-character"}
                                    key={`greeting-${index}`}
                                >
                                    {character === " " ? "\u00a0" : character}
                                </span>
                            ))}
                        </span>
                        <span className="typing-line" aria-hidden="true">
                            {[...displayedBottomLine].map((character, index) => (
                                <span
                                    className="typing-character typed"
                                    key={`bottom-${index}-${character}`}
                                >
                                    {character === " " ? "\u00a0" : character}
                                </span>
                            ))}
                            <span className={typedCount >= headingLength ? "typing-caret visible" : "typing-caret"} aria-hidden="true" />
                        </span>
                    </h1>
                </div>

                <p className="paragraph">
                    Lifelong learner with a curious attitude!
                    <br/>
                    I love to try new things and push my comfort zone.
                    <br/>
                    I want to have some fun &amp; make something awesome in this life!
                </p>

                <motion.a
                    href="#interests"
                    className="scroll-arrow"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 1}}
                    whileHover={{y: 5}}
                >
                    ↓
                </motion.a>
            </motion.div>

            <motion.div
                className="landing-photo"
                initial={{opacity: 0, scale: 0.95}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.8}}
            >
                <img src="/images/sammy.jpg" alt="Sammy" />
            </motion.div>
        </section>
    );
}

export default Landing;
