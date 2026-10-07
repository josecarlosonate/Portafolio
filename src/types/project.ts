export type LocalizedText = {
    ES: string;
    EN: string;
};

export type Project = {
    slug: string;
    order: number;
    title: LocalizedText;
    challenge: LocalizedText;
    solution: LocalizedText;
    stack: string[];
    image: string;
    repoUrl: string | null;
    liveUrl: string | null;
};
