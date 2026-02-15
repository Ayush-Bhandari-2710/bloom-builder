import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";
import { encode as hexEncode } from "https://deno.land/std@0.168.0/encoding/hex.ts";

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

    const url = new URL(req.url);
    const bouquetId = url.searchParams.get("id");

    if (!bouquetId) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing bouquet ID" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Use service role to bypass RLS, then filter manually
    const { data: bouquet, error } = await supabaseClient
      .from("bouquets")
      .select(`
        id, title, view_mode, pot_style, unlock_time, is_published,
        published_at, view_count, created_at, updated_at,
        bouquet_items (
          id, flower_type, x, y, rotation, scale, z_index, opacity, stem_length,
          messages (message_text, is_hidden)
        )
      `)
      .eq("id", bouquetId)
      .maybeSingle();

    if (error || !bouquet) {
      return new Response(
        JSON.stringify({ success: false, error: "Bouquet not found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404 }
      );
    }

    // Only allow viewing published bouquets
    if (!bouquet.is_published) {
      return new Response(
        JSON.stringify({ success: false, error: "Bouquet not published" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404 }
      );
    }

    // Check lock status
    const now = new Date();
    const unlockTime = bouquet.unlock_time ? new Date(bouquet.unlock_time) : null;
    const isLocked = unlockTime ? now < unlockTime : false;

    // Record view
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest("MD5", encoder.encode(ip));
    const ipHash = new TextDecoder().decode(hexEncode(new Uint8Array(hashBuffer)));

    await supabaseClient.from("views").insert({ bouquet_id: bouquetId, ip_hash: ipHash });
    await supabaseClient
      .from("bouquets")
      .update({ view_count: bouquet.view_count + 1 })
      .eq("id", bouquetId);

    // Format items
    const formattedItems = (bouquet.bouquet_items || []).map((item: any) => ({
      id: item.id,
      flowerType: item.flower_type,
      x: item.x,
      y: item.y,
      rotation: item.rotation,
      scale: item.scale,
      zIndex: item.z_index,
      opacity: item.opacity,
      stemLength: item.stem_length,
      message: item.messages?.[0]
        ? { text: item.messages[0].message_text, isHidden: item.messages[0].is_hidden }
        : undefined,
    }));

    return new Response(
      JSON.stringify({
        success: true,
        bouquet: {
          id: bouquet.id,
          title: bouquet.title,
          viewMode: bouquet.view_mode,
          potStyle: bouquet.pot_style,
          unlockTime: bouquet.unlock_time,
          isPublished: bouquet.is_published,
          publishedAt: bouquet.published_at,
          viewCount: bouquet.view_count,
          createdAt: bouquet.created_at,
          updatedAt: bouquet.updated_at,
          items: isLocked ? [] : formattedItems,
        },
        isLocked,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
