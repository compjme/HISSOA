const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Browser sends an OPTIONS request first to check if the request is allowed
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Get the message that React sends to this function
  const { message } = await req.json();

  // Send a fake response back to React
  return new Response(
    JSON.stringify({
      reply: `Supabase received your question: ${message}`,
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    },
  );
});