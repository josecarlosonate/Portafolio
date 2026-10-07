import { Resend } from "resend";
import { createContactEmail } from "./emails/contactEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactRequest = {
    name: string;
    email: string;
    message: string;
};

const isContactRequest = (body: unknown): body is ContactRequest => {
    if (typeof body !== "object" || body === null) return false;

    const data = body as Record<string, unknown>;

    return typeof data.name === "string" && typeof data.email === "string" && typeof data.message === "string";
};

export async function POST(request: Request) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return Response.json({ success: false }, { status: 400 });
    }

    if (!isContactRequest(body)) {
        return Response.json({ success: false }, { status: 400 });
    }

    // 2. Normalización
    const name = body.name.trim();
    const email = body.email.trim();
    const message = body.message.trim();

    // 3. Validación del contenido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        name.length < 2 ||
        name.length > 80 ||
        email.length > 254 ||
        !emailRegex.test(email) ||
        message.length < 10 ||
        message.length > 2000
    ) {
        return Response.json(
            { success: false },
            { status: 400 }
        );
    }

    const contactEmail = createContactEmail({
        name,
        email,
        message,
    });

    // 4. Envio
    try {
        const { error } = await resend.emails.send({
            from: "Portafolio <onboarding@resend.dev>",
            to: "ingeniero.josec@gmail.com",
            replyTo: email,
            ...contactEmail
        });

        if (error) {
            console.error("Resend error:", error);
            return Response.json({ success: false }, { status: 500 });
        }
    } catch (error) {
        console.error("Unexpected Resend error:", error);
        return Response.json({ success: false }, { status: 500 });
    }

    return Response.json({
        success: true,
    });
}