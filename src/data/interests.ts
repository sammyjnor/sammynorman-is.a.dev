export type Interest = {
    id: number;
    title: string;
    image: string;
    description: string;
    taglines?: string[];
    video?: string;
    link?: string;
};

// Add short hover taglines to each interest's taglines array; an empty array uses its title.
export const interests: Interest[] = [
    {
        id: 1,
        title: "Beekeeping",
        taglines: ["beekeepin'"],
        image: "images/bees4site.jpg",
        description: "For about ten years, my dad & I have been backyard beekeepers!\n" +
            "We get honey every year & love to observe the hives and their occupants.\n" +
            "\n" +
            "We have had issues with varroa mites in the past. As my Master's project, I created a GAN to produce images of honeybees infected with mites, hypothesizing that those images may be useful in future ML detection of mites.\n" +
            "Check out that project here!",
        link: "#projects",
    },
    {
        id: 2,
        title: "Building Things",
        taglines: ["tinkerin'"],
        image: "images/coding.jpg",
        description: "Software, machine learning, and weird side projects.",
    },
    {
        id: 3,
        title: "Outdoors",
        taglines: ["hikin' & explorin'"],
        image: "images/outdoors.jpg",
        description: "Hiking, camping, paddling, and exploring.",
    },
    {
        id: 4,
        title: "Guitar",
        taglines: ["guitar-pickin'", "guitar-playin'"],
        image: "images/guitar.jpg",
        description: "I may not be the best at guitar, but at least my dog sings along!\n" +
            "\n" +
            "I've been learning to play guitar for about a year now. I've always loved music, so getting to noodle around and make music of my own has been deeply rewarding. \n" +
            "\n" +
            "Last year, I took a _____ class, & for our final project, we used ____ to simulate music generation. Have a look here!",
        video: "videos/guitar.mp4",
    },
    {
        id: 5,
        title: "Travelin'",
        taglines: [],
        image: "images/travel.jpg",
        description: "Travel, new places, and getting out of my comfort zone.",
    },
    {
        id: 6,
        title: "Dungeons & Dragons",
        taglines: [],
        image: "images/curiosity.jpg",
        description: "Rolling dice, telling stories, and going on adventures with friends.",
    },
];
