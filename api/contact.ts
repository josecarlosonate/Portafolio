import { Resend } from "resend";
import { createContactEmail } from "./emails/contactEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactRequest = {
    name: string;
    email: string;
    message: string;
};

export async function POST(request: Request) {
    const body: ContactRequest = await request.json();

    // 1. Validación estructural
    if (
        typeof body.name !== "string" ||
        typeof body.email !== "string" ||
        typeof body.message !== "string"
    ) {
        return Response.json(
            { success: false },
            { status: 400 }
        );
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
    const { error } = await resend.emails.send({
        from: "Portafolio <onboarding@resend.dev>",
        to: "ingeniero.josec@gmail.com",
        replyTo: email,
        ...contactEmail
    });

    if (error) {
        console.error("Resend error:", error);

        return Response.json(
            { success: false },
            { status: 500 }
        );
    }

    return Response.json({
        success: true,
    });
}