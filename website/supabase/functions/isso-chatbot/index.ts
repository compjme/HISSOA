/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req:Request) => {
  // Handles the browser's CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get the message sent from React
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Message is required." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Get the private OpenAI key from Supabase secrets
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");

    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: "Missing OpenAI API key." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Send the student's question to OpenAI
    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        instructions: `
You are an ISSO assistant for Brooklyn College.

Your job:
- Help students understand ISSO resources, scheduling, community support, and general website navigation.
- Keep answers clear, friendly, and concise.
- If the answer depends on an official policy, tell the student to confirm with ISSO directly.
- Do not give legal advice, immigration legal advice, or make up official Brooklyn College policies.
- If you do not know something, say that clearly and suggest contacting ISSO.
        `,
        input: message,
      }),
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      console.error("OpenAI error:", data);

      return new Response(
        JSON.stringify({
          reply: "Sorry, I could not get an AI response right now.",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const reply =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "Sorry, I could not generate a response.";

    // Send the AI reply back to React
    return new Response(
      JSON.stringify({
        reply,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Function error:", error);

    return new Response(
      JSON.stringify({
        reply: "Something went wrong inside the chatbot function.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});