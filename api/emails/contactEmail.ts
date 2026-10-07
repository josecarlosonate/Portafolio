const escapeHtml = (value: string): string =>
    value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

type ContactEmailProps = {
    name: string;
    email: string;
    message: string;
};

export const createContactEmail = ({ name, email, message }: ContactEmailProps) => {
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    return {
        subject: `Nuevo mensaje de ${name}`,
        text: `Nuevo mensaje desde tu portafolio Nombre: ${name} Email: ${email} Mensaje: ${message}`.trim(),
        html: `
            <div style=" margin: 0; padding: 40px 20px; background-color: #f1f5f9; font-family: Arial, Helvetica, sans-serif; color: #0f172a;">
                <div style="max-width: 600px; margin: 0 auto; overflow: hidden; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px;">
                    <div style="padding: 28px 32px; background-color: #0f172a;">
                        <p style="margin: 0 0 8px; color: #60a5fa; font-size: 12px; font-weight: 700; letter-spacing: 1.5px;">
                            PORTAFOLIO
                        </p>
                        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; line-height: 1.3;">
                            Nuevo mensaje de contacto
                        </h1>
                    </div>

                    <div style="padding: 32px;">
                        <p style="margin: 0 0 28px; color: #475569; font-size: 15px; line-height: 1.6;">
                            Alguien se ha puesto en contacto contigo desde tu portafolio.
                        </p>

                        <div style="margin-bottom: 24px;">
                            <p style="margin: 0 0 6px; color: #94a3b8; font-size: 11px; font-weight: 700; letter-spacing: 1px;">
                                NOMBRE
                            </p>
                            <p style="margin: 0; color: #0f172a; font-size: 16px; font-weight: 600;">
                                ${safeName}
                            </p>
                        </div>

                        <div style="margin-bottom: 28px;">
                            <p style="margin: 0 0 6px; color: #94a3b8; font-size: 11px; font-weight: 700; letter-spacing: 1px;">
                                EMAIL
                            </p>
                            <a href="mailto:${safeEmail}"
                                style="color: #2563eb; font-size: 16px; text-decoration: none;">
                                ${safeEmail}
                            </a>
                        </div>

                        <div>
                            <p style="margin: 0 0 10px; color: #94a3b8; font-size: 11px; font-weight: 700; letter-spacing: 1px;">
                                MENSAJE
                            </p>
                            <div style="padding: 18px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; color: #334155; font-size: 15px; line-height: 1.7; white-space: pre-wrap; word-break: break-word;">
                                ${safeMessage}
                            </div>
                        </div>

                        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 1.5;">
                                Enviado automáticamente desde el formulario de contacto de tu portafolio.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `,
    };
};