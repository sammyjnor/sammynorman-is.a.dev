type DancingStarHeadingProps = {
    as: "h2" | "h3";
    children: string;
    className?: string;
};

function DancingStarHeading({ as: Tag, children, className }: DancingStarHeadingProps) {
    const firstLetter = children.charAt(0);

    return (
        <Tag className={`dancing-star-heading ${className ?? ""}`}>
            <span className="dancing-star-letter">
                <svg className="dancing-star-shape" viewBox="0 0 200 200" aria-hidden="true">
                    <path
                        d="M100 12 Q103 10 105 17 L125 65 Q127 70 133 70 L184 74 Q193 75 187 82 L148 115 Q144 119 146 125 L158 175 Q160 184 152 179 L106 153 Q100 150 94 153 L48 179 Q40 184 42 175 L54 125 Q56 119 52 115 L13 82 Q7 75 16 74 L67 70 Q73 70 75 65 L95 17 Q97 10 100 12 Z"
                        fill="currentColor"
                    />
                </svg>
                <span className="dancing-star-first-letter">{firstLetter}</span>
            </span>
            {children.slice(1)}
        </Tag>
    );
}

export default DancingStarHeading;
