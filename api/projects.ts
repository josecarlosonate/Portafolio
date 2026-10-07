import { getDb } from "./lib/mongo";

type Localized = {
    ES: string;
    EN: string;
};

type ProjectDocument = {
    slug: string;
    order: number;
    title: Localized;
    challenge: Localized;
    solution: Localized;
    stack: string[];
    image: string;
    repoUrl?: string;
    liveUrl?: string;
    published?: boolean;
};

const isLocalized = (value: unknown): value is Localized => {
    if (typeof value !== "object" || value === null) return false;
    const data = value as Record<string, unknown>;
    return typeof data.ES === "string" && typeof data.EN === "string";
};

const toProject = (doc: ProjectDocument) => ({
    slug: doc.slug,
    order: doc.order,
    title: doc.title,
    challenge: doc.challenge,
    solution: doc.solution,
    stack: doc.stack,
    image: doc.image,
    repoUrl: doc.repoUrl ?? null,
    liveUrl: doc.liveUrl ?? null,
});

export async function GET() {
    try {
        const db = await getDb();
        const docs = await db
            .collection<ProjectDocument>("projects")
            .find({ published: { $ne: false } })
            .sort({ order: 1 })
            .toArray();

        const projects = docs
            .filter((doc) =>
                typeof doc.slug === "string" &&
                typeof doc.order === "number" &&
                isLocalized(doc.title) &&
                isLocalized(doc.challenge) &&
                isLocalized(doc.solution) &&
                Array.isArray(doc.stack) &&
                typeof doc.image === "string"
            )
            .map(toProject);

        return Response.json({ projects });
    } catch (error) {
        console.error("Projects query failed:", error);
        return Response.json({ projects: [] }, { status: 500 });
    }
}
