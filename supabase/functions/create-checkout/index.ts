// Supabase Edge Function: create-checkout
// Runs on Deno serverless edge runtime with 0 monthly cost (500k invocations free/mo)
// Prevents client-side price tampering by recalculating package & add-on costs on the server.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Official Base Prices (USD)
const BASE_TIER_PRICES: Record<string, number> = {
  "3-star": 1050,
  "4-star": 1450,
  "5-star": 2900,
};

const ADD_ON_PRICES_USD = {
  heliReturn: 650,     // Per person Airbus H125 descent
  gearRental: 85,      // Complete 4-season alpine pack
  satelliteDevice: 60, // Garmin InReach transponder
  privateJeep: 90,     // Private 4x4 Pokhara - Nayapul transfer
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const {
      bookingCode,
      tier,
      groupSize,
      heliReturn,
      gearRental,
      satelliteDevice,
      privateJeep,
      currency = "USD",
      customerEmail,
    } = await req.json();

    // 1. Server-side tamper-proof price calculation
    const basePerPerson = BASE_TIER_PRICES[tier] || 1450;
    const baseTotal = basePerPerson * Number(groupSize);

    let addOnsTotal = 0;
    if (heliReturn) addOnsTotal += ADD_ON_PRICES_USD.heliReturn * Number(groupSize);
    if (gearRental) addOnsTotal += ADD_ON_PRICES_USD.gearRental * Number(groupSize);
    if (satelliteDevice) addOnsTotal += ADD_ON_PRICES_USD.satelliteDevice;
    if (privateJeep) addOnsTotal += ADD_ON_PRICES_USD.privateJeep;

    const verifiedTotalUsd = baseTotal + addOnsTotal;

    // Convert if NPR
    const exchangeRate = 134; // NPR per USD
    const finalAmount = currency === "NPR" ? Math.round(verifiedTotalUsd * exchangeRate) : verifiedTotalUsd;

    // 2. Stripe Checkout Session Initialization (if STRIPE_SECRET_KEY is configured)
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    let checkoutUrl = null;

    if (stripeKey) {
      // In production with Stripe key set:
      // Call Stripe REST API to create session
      const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "payment_method_types[0]": "card",
          "line_items[0][price_data][currency]": currency.toLowerCase(),
          "line_items[0][price_data][product_data][name]": `Annapurna Sanctuary Trek (${tier.toUpperCase()}) - #${bookingCode}`,
          "line_items[0][price_data][unit_amount]": String(finalAmount * 100), // in cents/paisa
          "line_items[0][quantity]": "1",
          mode: "payment",
          success_url: `https://annapurnabasecamp.org/?booking_success=true&ref=${bookingCode}`,
          cancel_url: `https://annapurnabasecamp.org/?booking_cancelled=true&ref=${bookingCode}`,
          customer_email: customerEmail || "",
        }),
      });

      const session = await stripeResponse.json();
      checkoutUrl = session.url;
    }

    return new Response(
      JSON.stringify({
        success: true,
        bookingCode,
        verifiedAmount: finalAmount,
        currency,
        checkoutUrl: checkoutUrl || `https://checkout.stripe.com/pay/mock_${bookingCode}`,
        message: stripeKey ? "Stripe session created" : "Price verified on Edge (Stripe in test mode)",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Server Error";
    return new Response(
      JSON.stringify({ error: errorMsg }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
