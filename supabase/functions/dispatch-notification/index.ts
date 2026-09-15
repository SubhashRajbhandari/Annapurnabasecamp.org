// Supabase Edge Function: dispatch-notification
// Sends official trekker confirmation email (via Resend) and alerts the field ops team in Nepal.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const {
      bookingCode,
      leadName,
      leadEmail,
      leadPhone,
      leadNationality,
      tier,
      groupSize,
      startDate,
      totalPrice,
      currency,
      porterOption,
    } = await req.json();

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const opsWebhookUrl = Deno.env.get("OPS_DISPATCH_WEBHOOK_URL");

    // 1. Send Expedition Voucher via Resend (if configured)
    let emailSent = false;
    if (resendApiKey && leadEmail) {
      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #bae6fd; border-radius: 16px; background-color: #f8fafd;">
          <h1 style="color: #0284c7; font-size: 24px;">ANNAPURNA BASE CAMP (4,130m)</h1>
          <h2 style="color: #0f172a; margin-top: 0;">Official Expedition Voucher & Permit Registration</h2>
          <p>Namaste ${leadName},</p>
          <p>Your sanctuary reservation has been officially received. Our dispatch team in Pokhara and Kathmandu is allocating your ACAP conservation permits and certified mountain guide.</p>
          
          <div style="background-color: #ffffff; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0; margin: 20px 0;">
            <p><strong>Booking Ref:</strong> ${bookingCode}</p>
            <p><strong>Expedition Tier:</strong> ${tier.toUpperCase()}</p>
            <p><strong>Party Size:</strong> ${groupSize} Trekker(s)</p>
            <p><strong>Porter Configuration:</strong> ${porterOption}</p>
            <p><strong>Departure Date:</strong> ${startDate}</p>
            <p><strong>Total Quote:</strong> ${currency} ${totalPrice.toLocaleString()}</p>
          </div>

          <p style="font-size: 12px; color: #64748b;">
            24/7 Emergency Satellite Dispatch: +977 (01) 4700-ABC | Pokhara Heliport Standby: 121.5 MHz
          </p>
        </div>
      `;

      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Annapurna Expeditions <reservations@annapurnabasecamp.org>",
          to: [leadEmail],
          subject: `Confirmed Expedition Voucher #${bookingCode} — Annapurna Base Camp`,
          html: emailHtml,
        }),
      });

      emailSent = emailRes.ok;
    }

    // 2. Alert Field Operations in Pokhara (Slack / Discord / WhatsApp webhook)
    if (opsWebhookUrl) {
      await fetch(opsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🏔️ **NEW EXPEDITION DISPATCH [#${bookingCode}]**\n• **Lead Trekker**: ${leadName} (${leadNationality})\n• **Contact**: ${leadPhone} | ${leadEmail}\n• **Tier**: ${tier} (${groupSize} Pax)\n• **Start Date**: ${startDate}\n• **Total**: ${currency} ${totalPrice}`,
        }),
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        bookingCode,
        emailSent,
        message: "Notification cycle completed",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error dispatching notifications";
    return new Response(
      JSON.stringify({ error: msg }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
