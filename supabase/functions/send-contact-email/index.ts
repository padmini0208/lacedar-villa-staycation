import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
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

const handler = async (req: Request): Promise<Response> => {
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

    const { firstName, lastName, email, phone, message }: ContactFormRequest = await req.json();

    console.log("Received contact form submission:", { firstName, lastName, email, phone, message });

    // Try to send notification email to owner
    // Note: In testing mode, Resend can only send to the account owner's email
    // To send to other emails, verify a domain at resend.com/domains
    try {
      const ownerEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "La Cedar Villa <onboarding@resend.dev>",
          to: ["pooja.leo1993@gmail.com"], // Using verified email for testing
          subject: `New Contact Form: ${firstName} ${lastName}`,
          html: `
            <h1>New Contact Form Submission</h1>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <h2>Message:</h2>
            <p>${message}</p>
            <hr>
            <p><em>This message was sent from the La Cedar Villa website contact form.</em></p>
            <p><strong>Reply to this customer at:</strong> ${email}</p>
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

    // Return success regardless - the form submission was received
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
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
