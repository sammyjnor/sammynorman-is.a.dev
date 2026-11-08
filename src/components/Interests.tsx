import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { interests } from "../data/interests";
import InterestVideo from "./InterestVideo";
import Polaroid from "./Polaroid";
import DancingStarHeading from "./DancingStarHeading";

// Keep profile links together here so platforms and destinations are easy to edit.
const socialLinkGroups = [
    {
        label: "Professional",
        links: [
            { label: "LinkedIn", href: "https://www.linkedin.com/in/samantha-norman-comsci" },
            { label: "GitHub", href: "https://github.com/sammyjnor/" },
        ],
    },
    {
        label: "Social",
        links: [
            { label: "Postcrossing", href: "https://www.postcrossing.com/user/kcehlilpy" },
            { label: "Instagram", href: "https://www.instagram.com/sammyjnor" },
        ],
    },
];

const profilePanelVariants = {
    hidden: { opacity: 0, x: 72 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.65,
            ease: "easeOut" as const,
            when: "beforeChildren" as const,
            delayChildren: 0.5,
            staggerChildren: 0.2,
        },
    },
};

const profileContentVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" as const },
    },
};

function Interests() {
    const [activeInterest, setActiveInterest] = useState<number | null>(null);
    const polaroidGridRef = useRef<HTMLDivElement | null>(null);
    const polaroidsInView = useInView(polaroidGridRef, { once: true, amount: 0.2 });
    const activeInterestData = interests.find(
        (interest) => interest.id === activeInterest
    );

    return (
        <section id="interests" className="interests">
            <motion.aside
                className="profile-panel"
                onPointerMove={(event) => {
                    const bounds = event.currentTarget.getBoundingClientRect();
                    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
                    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
                    event.currentTarget.style.setProperty("--pointer-x", `${x}%`);
                    event.currentTarget.style.setProperty("--pointer-y", `${y}%`);
                }}
                variants={profilePanelVariants}
                initial="hidden"
                animate={polaroidsInView ? "visible" : "hidden"}
            >
                <motion.img
                    className="profile-headshot"
                    src={`${import.meta.env.BASE_URL}images/sammy2.JPG`}
                    alt="Sammy"
                    variants={profileContentVariants}
                />

                <motion.h2
                    className="profile-panel-heading"
                    variants={profileContentVariants}
                >
                    Let's Connect!
                </motion.h2>

                <motion.div className="profile-socials" variants={profileContentVariants}>
                    <nav aria-label="Social media">
                        {socialLinkGroups.map((group) => (
                            <section className="profile-link-group" key={group.label}>
                                <h3 className="profile-link-group-heading">{group.label}</h3>
                                {group.links.map(({ label, href }, index) => (
                                    <a
                                        className={`profile-social-link ${label === "LinkedIn" ? "profile-social-link-featured" : ""} ${index % 2 === 0 ? "profile-social-link-sky" : "profile-social-link-berry"}`}
                                        href={href}
                                        key={label}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <DancingStarHeading as="h3" className="profile-social-heading">
                                            {label}
                                        </DancingStarHeading>
                                    </a>
                                ))}
                            </section>
                        ))}
                    </nav>
                </motion.div>
            </motion.aside>

            <div className="interests-content">
                <h2 className="interests-heading">
                    Get to Know Me
                    {[
                        { side: "left", color: "var(--sky)", x: -25, y: -8, size: 18 },
                        { side: "left", color: "var(--berry)", x: -44, y: 6, size: 14 },
                        { side: "left", color: "var(--cream)", x: -60, y: -5, size: 10 },
                        { side: "right", color: "var(--sky)", x: 25, y: 7, size: 18 },
                        { side: "right", color: "var(--cream)", x: 44, y: -6, size: 14 },
                        { side: "right", color: "var(--berry)", x: 60, y: 4, size: 10 },
                    ].map((star, index) => (
                        <motion.span
                            key={`heading-star-${index}`}
                            className={`heading-burst-star${polaroidsInView ? " heading-burst-star-active" : ""}`}
                            initial={{ opacity: 0, scale: 0.25, x: 0, y: 0 }}
                            animate={polaroidsInView
                                ? { opacity: 1, scale: 1, x: star.x, y: star.y }
                                : { opacity: 0, scale: 0.25, x: 0, y: 0 }}
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
                </h2>
                <div className="polaroid-container" ref={polaroidGridRef}>
                    {interests.map((interest, index) => (
                        <Polaroid
                            key={interest.id}
                            interest={interest}
                            index={index}
                            isActive={activeInterest === interest.id}
                            onOpen={() => setActiveInterest(interest.id)}
                            onClose={() => setActiveInterest(null)}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {activeInterestData && (
                    <motion.div
                        className="interest-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <button
                            className="overlay-close"
                            onClick={() => setActiveInterest(null)}
                            aria-label="Close expanded interest"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="m7 7 10 10M17 7 7 17" />
                            </svg>
                        </button>

                        <motion.article
                            className="interest-expanded"
                            initial={{ y: "100%", rotateX: 12 }}
                            animate={{ y: 0, rotateX: 0 }}
                            exit={{ y: "100%", rotateX: 12 }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                            }}
                        >
                            {activeInterestData.video ? (
                                <InterestVideo
                                    key={activeInterestData.id}
                                    image={activeInterestData.image}
                                    title={activeInterestData.title}
                                    video={activeInterestData.video}
                                />
                            ) : (
                                <img
                                    src={`${import.meta.env.BASE_URL}${activeInterestData.image}`}
                                    alt={activeInterestData.title}
                                />
                            )}

                            <div className="interest-expanded-content">
                                <DancingStarHeading as="h2">{activeInterestData.title}</DancingStarHeading>
                                <p>{activeInterestData.description}</p>

                                {activeInterestData.link && (
                                    <a href={activeInterestData.link}>
                                        See the project â†’
                                    </a>
                                )}
                            </div>
                        </motion.article>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default Interests;
