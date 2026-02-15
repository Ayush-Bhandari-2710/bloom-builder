import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";
import { encode as hexEncode } from "https://deno.land/std@0.168.0/encoding/hex.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function hashIp(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest("MD5", encoder.encode(ip));
  return new TextDecoder().decode(hexEncode(new Uint8Array(hashBuffer)));
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const ipHash = await hashIp(ip);

    if (req.method === "POST") {
      const { error } = await supabaseClient
        .from("premium_votes")
        .insert({ ip_hash: ipHash });

      if (error) {
        return new Response(
          JSON.stringify({ success: false, error: "Already voted" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 409 }
        );
      }

      const { count } = await supabaseClient
        .from("premium_votes")
        .select("*", { count: "exact", head: true });

      return new Response(
        JSON.stringify({ success: true, totalVotes: count }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else if (req.method === "DELETE") {
      await supabaseClient.from("premium_votes").delete().eq("ip_hash", ipHash);

      const { count } = await supabaseClient
        .from("premium_votes")
        .select("*", { count: "exact", head: true });

      return new Response(
        JSON.stringify({ success: true, totalVotes: count }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else if (req.method === "GET") {
      const { count } = await supabaseClient
        .from("premium_votes")
        .select("*", { count: "exact", head: true });

      return new Response(
        JSON.stringify({ success: true, totalVotes: count }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 405 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
