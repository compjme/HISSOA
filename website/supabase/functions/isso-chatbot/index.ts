/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

const corsHeaders = { // main calls for the supabase edge function 
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => { //creates the backend serverless function 
  if (req.method === "OPTIONS") { //checks for the 
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") { //confirms that a message was sent, if not then an error msg 
      return new Response(
        JSON.stringify({ reply: "Message is required." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const geminiApiKey = Deno.env.get("GEMINI_API_KEY"); // API call from supabase secrets 

    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({ reply: "Missing Gemini API key." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const issoContext = `
Official ISSO Website Context:

ISSO stands for Immigrant Student Success Office.
ISSO supports immigrant, undocumented, first-generation, and allied students at Brooklyn College.
Students can view public website pages without signing in.
Signing in may be required for posting in the community section or for scheduling-related actions.
Students can schedule appointments through the Scheduling page. The site may direct students to Navigate360 or provide ISSO contact information.
ISSO resources are mainly for immigrant, undocumented, first-generation, and supportive student communities at Brooklyn College.
If contact details, appointment links, office hours, or legal/policy-specific information are not available in this context, tell the student to contact ISSO directly.
`;

const prompt = `
You are an ISSO assistant for Brooklyn College.

Rules:
- Use the context to answer.
- Do not make up office hours, emails, links, policies, legal rules, or immigration advice.
- If the answer is not in the context, say: "I do not have that information yet. Please contact ISSO directly or check the official ISSO page."
- Keep answers short, clear, and student-friendly.

Context:
${issoContext}

Student question:
${message}
`;

    const geminiResponse = await fetch( //sends the prompt to gemini api !
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
      {
        method: "POST",
        headers: {
          "x-goog-api-key": geminiApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await geminiResponse.json(); //response gets converted to usable JSON

    if (!geminiResponse.ok) {
      console.error("Gemini error:", data); 

      return new Response( // gets geminis text answer from the response and error case 
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
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I could not generate a response.";

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