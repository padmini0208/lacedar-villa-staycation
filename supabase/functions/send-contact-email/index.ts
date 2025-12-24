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

    console.log("Received contact form submission:", { firstName, lastName, email, phone });

    // Send notification email to owner
    const ownerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "La Cedar Villa <onboarding@resend.dev>",
        to: ["mviney86@gmail.com"],
        subject: `New Contact Form Submission from ${firstName} ${lastName}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <h2>Message:</h2>
          <p>${message}</p>
          <hr>
          <p><em>This message was sent from the La Cedar Villa website contact form.</em></p>
        `,
      }),
    });

    if (!ownerEmailResponse.ok) {
      const errorData = await ownerEmailResponse.text();
      console.error("Failed to send owner notification email:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    console.log("Owner notification email sent successfully");

    // Send confirmation email to the user
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "La Cedar Villa <onboarding@resend.dev>",
        to: [email],
        subject: "Thank you for contacting La Cedar Villa!",
        html: `
          <h1>Thank you for reaching out, ${firstName}!</h1>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p>In the meantime, feel free to call us at <strong>+91 9582762742</strong> or <strong>+91 8076760431</strong> for immediate assistance.</p>
          <br>
          <p>Best regards,<br>The La Cedar Villa Team</p>
        `,
      }),
    });

    if (!userEmailResponse.ok) {
      console.error("Failed to send user confirmation email");
    } else {
      console.log("User confirmation email sent successfully");
    }

    return new Response(JSON.stringify({ success: true }), {
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
