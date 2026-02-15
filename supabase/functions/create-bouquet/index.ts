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

    const { title, viewMode, potStyle, editToken } = await req.json();

    if (!editToken || editToken.length < 32) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid edit token" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const editTokenHash = bcrypt.hashSync(editToken);

    const { data: bouquet, error } = await supabaseClient
      .from("bouquets")
      .insert({
        title: title || "Untitled Bouquet",
        view_mode: viewMode || "topDown",
        pot_style: potStyle || null,
        edit_token_hash: editTokenHash,
      })
      .select("id")
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, bouquetId: bouquet.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
