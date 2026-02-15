import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { bouquetId, editToken } = await req.json();

    if (!bouquetId || !editToken) {
      return new Response(
        JSON.stringify({ success: true, valid: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data: bouquet } = await supabaseClient
      .from("bouquets")
      .select("edit_token_hash")
      .eq("id", bouquetId)
      .maybeSingle();

    if (!bouquet) {
      return new Response(
        JSON.stringify({ success: true, valid: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isValid = bcrypt.compareSync(editToken, bouquet.edit_token_hash);

    return new Response(
      JSON.stringify({ success: true, valid: isValid }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
