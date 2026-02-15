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

    const { bouquetId, editToken, unlockTime } = await req.json();

    if (!bouquetId || !editToken) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const { data: bouquet, error: fetchError } = await supabaseClient
      .from("bouquets")
      .select("edit_token_hash, bouquet_items(id)")
      .eq("id", bouquetId)
      .maybeSingle();

    if (fetchError || !bouquet) {
      return new Response(
        JSON.stringify({ success: false, error: "Bouquet not found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404 }
      );
    }

    const isValid = bcrypt.compareSync(editToken, bouquet.edit_token_hash);
    if (!isValid) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid edit token" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 403 }
      );
    }

    if (!bouquet.bouquet_items || bouquet.bouquet_items.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Cannot publish empty bouquet" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    if (unlockTime) {
      const unlockDate = new Date(unlockTime);
      if (unlockDate <= new Date()) {
        return new Response(
          JSON.stringify({ success: false, error: "Unlock time must be in the future" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }
    }

    await supabaseClient
      .from("bouquets")
      .update({
        is_published: true,
        published_at: new Date().toISOString(),
        unlock_time: unlockTime || null,
      })
      .eq("id", bouquetId);

    return new Response(
      JSON.stringify({ success: true, message: "Bouquet published" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
