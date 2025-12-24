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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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
