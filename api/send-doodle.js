import { Resend } from 'resend';

// Vercel Serverless Function (works on free tier)
export default async function handler(req, res) {
    // Handle CORS for development/production
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'Missing image data' });
        }

        const emailResponse = await resend.emails.send({
            from: 'Gift App <onboarding@resend.dev>', // Free tier default. Update if you have a custom domain.
            to: ['muhammad0alire@gmail.com'],
            subject: '🎨 New Doodle from Your Heart!',
            html: `
        <h1>You received a new doodle!</h1>
        <p>She drew something special for you.</p>
        <p>See attached!</p>
      `,
            attachments: [
                {
                    filename: 'doodle.jpg',
                    content: image.split(',')[1],
                    encoding: 'base64',
                },
            ],
        });

        console.log("Email sent:", emailResponse);
        return res.status(200).json({ success: true, data: emailResponse });

    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
