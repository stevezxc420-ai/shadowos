import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.90.1";

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `Act as an Elite AI Shadow Operator and Digital Monetization Strategist. Your goal is to analyze the provided creator data (YouTube/Instagram) and architect a high-profit digital business model for them.

YOUR RULES:
1. TONE: Professional, strategic, visionary, and "profit-first." Use industry terms like LTV (Lifetime Value), Lead Magnets, and FOMO.
2. NO GENERIC IDEAS: Do not suggest "Start a newsletter" or "Sell a shirt." Suggest specific, gap-filling products like "The 4-Week High-Ticket Pottery Mastermind" or "The Automated Creator-to-Client Notion System."
3. DATA-DRIVEN: Reference specific themes or audience complaints found in the provided data to justify your ideas.

OUTPUT STRUCTURE (Return ONLY valid JSON):
{
  "creator_analysis": {
    "niche": "Primary category",
    "audience_vibe": "Description of audience psychology",
    "unmet_needs": ["List of 3 specific problems the audience is complaining about"]
  },
  "the_product": {
    "name": "Catchy, high-value product name",
    "type": "Course / Community / Template / Workshop",
    "one_sentence_pitch": "The 'Transformational' promise",
    "suggested_price": "One-time price and why",
    "estimated_revenue_potential": "Monthly revenue estimate based on followers",
    "base_audience_size": 10000,
    "base_price": 97
  },
  "competitor_gaps": [
    {
      "flaw": "Specific competitor weakness in this niche",
      "advantage": "How the creator can exploit this gap"
    }
  ],
  "launch_strategy": {
    "pre_launch_hook": "A 'coming soon' teaser idea",
    "day_1_to_30_plan": [
      {"week": 1, "focus": "Awareness & Problem-Highlighting"},
      {"week": 2, "focus": "Solution Teasing"},
      {"week": 3, "focus": "Social Proof & Trust"},
      {"week": 4, "focus": "The Hard Launch & Scarcity"}
    ],
    "viral_hooks": ["5 specific Reel/Short hooks tailored to their voice"],
    "dm_script": "A ready-to-use DM script for reaching out to potential customers or collaborators"
  }
}`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { url, platform } = await req.json();

    if (!url) {
      throw new Error('URL is required');
    }

    // Check user credits
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('credits')
      .eq('user_id', user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      throw new Error('Failed to fetch user profile');
    }

    if (!profile || profile.credits <= 0) {
      return new Response(
        JSON.stringify({ error: 'Insufficient credits', code: 'NO_CREDITS' }),
        { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let userPrompt: string;

    if (platform === 'youtube') {
      userPrompt = `Analyze this YouTube creator based on their channel URL: ${url}
      
Please analyze the typical content, audience engagement patterns, and potential monetization opportunities for this creator. Provide strategic insights for a high-profit digital product they could launch.`;
    } else if (platform === 'instagram') {
      userPrompt = `Analyze this Instagram creator based on their profile URL: ${url}

Note: This is a placeholder analysis. In a production environment, we would scrape the Instagram profile for content themes, engagement metrics, and audience demographics. For now, provide strategic insights based on common Instagram creator patterns and the profile URL context.

Please suggest a high-profit digital product strategy for this creator.`;
    } else {
      throw new Error('Invalid platform. Must be "youtube" or "instagram"');
    }

    console.log('Calling Lovable AI Gateway for:', platform, url);

    const response = await fetch(
      'https://ai.gateway.lovable.dev/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'google/gemini-3-flash-preview',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userPrompt }
          ],
          response_format: { type: 'json_object' }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.', code: 'RATE_LIMITED' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add funds to your workspace.', code: 'AI_CREDITS_EXHAUSTED' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiData = await response.json();
    console.log('Lovable AI response received');

    const content = aiData.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('No content in AI response');
    }

    let parsedReport;
    try {
      parsedReport = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse AI JSON response:', content);
      throw new Error('Failed to parse AI response as JSON');
    }

    // Deduct credit after successful generation
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ credits: profile.credits - 1 })
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Failed to deduct credit:', updateError);
    }

    return new Response(
      JSON.stringify({ 
        report: parsedReport, 
        credits_remaining: profile.credits - 1,
        platform,
        url 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-creator function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
