import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const HCAPTCHA_SECRET_KEY = Deno.env.get("HCAPTCHA_SECRET_KEY");

// Allowed origins for CORS - restrict to production and development domains
const ALLOWED_ORIGINS = [
  "https://lacedarvilla.com",
  "https://www.lacedarvilla.com",
  "https://id-preview--744ae87b-bb76-4a45-aa12-52b75a3f58b0.lovable.app",
  "http://localhost:8080",
  "http://localhost:5173",
];

const getCorsHeaders = (origin: string | null) => ({
  "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin || "") ? origin! : ALLOWED_ORIGINS[0],
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
});

interface ContactFormRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  captchaToken: string;
}

// Rate limiting: Track requests per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  
  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 }); // 1 minute window
    return true;
  }
  
  if (limit.count >= 3) { // Max 3 submissions per minute
    return false;
  }
  
  limit.count++;
  return true;
}

// HTML escape function to prevent XSS
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Verify hCaptcha token
async function verifyCaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `response=${token}&secret=${HCAPTCHA_SECRET_KEY}`,
    });
    
    const data = await response.json();
    console.log("hCaptcha verification response:", data);
    return data.success === true;
  } catch (error) {
    console.error("hCaptcha verification error:", error);
    return false;
  }
}

const handler = async (req: Request): Promise<Response> => {
  const requestOrigin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(requestOrigin);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check rate limit
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      console.log(`Rate limit exceeded for IP: ${ip}`);
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { firstName, lastName, email, phone, message, captchaToken }: ContactFormRequest = await req.json();

    // Validate required fields
    if (!firstName || firstName.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Invalid first name' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (lastName && lastName.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Invalid last name' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 255) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (phone && phone.length > 20) {
      return new Response(
        JSON.stringify({ error: 'Invalid phone number' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!message || message.length > 5000) {
      return new Response(
        JSON.stringify({ error: 'Invalid message' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Verify CAPTCHA
    if (!captchaToken) {
      return new Response(
        JSON.stringify({ error: 'Please complete the CAPTCHA verification' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const captchaValid = await verifyCaptcha(captchaToken);
    if (!captchaValid) {
      console.log("CAPTCHA verification failed");
      return new Response(
        JSON.stringify({ error: 'CAPTCHA verification failed. Please try again.' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Received contact form submission:", { firstName, lastName, email, phone });

    // Escape HTML in user inputs before embedding in email
    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName || '');
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || '');
    const safeMessage = escapeHtml(message);

    // Try to send notification email to owner
    try {
      const ownerEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "La Cedar Villa <onboarding@resend.dev>",
          to: ["pooja.leo1993@gmail.com"],
          subject: `New Contact Form: ${safeFirstName} ${safeLastName}`,
          html: `
            <h1>New Contact Form Submission</h1>
            <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Phone:</strong> ${safePhone}</p>
            <h2>Message:</h2>
            <p>${safeMessage}</p>
            <hr>
            <p><em>This message was sent from the La Cedar Villa website contact form.</em></p>
            <p><strong>Reply to this customer at:</strong> ${safeEmail}</p>
          `,
        }),
      });

      if (ownerEmailResponse.ok) {
        console.log("Owner notification email sent successfully");
      } else {
        const errorData = await ownerEmailResponse.text();
        console.error("Failed to send owner notification email:", errorData);
      }
    } catch (emailError) {
      console.error("Email sending error:", emailError);
    }

    console.log("Contact form processed successfully for:", firstName, lastName);
    
    return new Response(JSON.stringify({ 
      success: true,
      message: "Your message has been received. We will contact you shortly!"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    // Return generic error message to prevent information leakage
    return new Response(
      JSON.stringify({ error: "An error occurred while processing your request. Please try again later." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
