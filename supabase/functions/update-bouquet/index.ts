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

    const { bouquetId, editToken, title, viewMode, potStyle, items } = await req.json();

    if (!bouquetId || !editToken) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing bouquetId or editToken" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Validate token
    const { data: bouquet, error: fetchError } = await supabaseClient
      .from("bouquets")
      .select("edit_token_hash")
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

    // Update bouquet metadata
    const updates: Record<string, unknown> = {};
    if (title !== undefined) updates.title = title;
    if (viewMode !== undefined) updates.view_mode = viewMode;
    if (potStyle !== undefined) updates.pot_style = potStyle;

    if (Object.keys(updates).length > 0) {
      await supabaseClient.from("bouquets").update(updates).eq("id", bouquetId);
    }

    // Update items if provided
    if (items && Array.isArray(items)) {
      // Delete existing items (cascade deletes messages)
      await supabaseClient.from("bouquet_items").delete().eq("bouquet_id", bouquetId);

      if (items.length > 0) {
        const itemsToInsert = items.map((item: any) => ({
          bouquet_id: bouquetId,
          flower_type: item.flowerType,
          x: item.x,
          y: item.y,
          rotation: item.rotation || 0,
          scale: item.scale || 1,
          z_index: item.zIndex || 0,
          opacity: item.opacity || 1,
          stem_length: item.stemLength || 1.0,
        }));

        const { data: createdItems } = await supabaseClient
          .from("bouquet_items")
          .insert(itemsToInsert)
          .select("id");

        // Insert messages
        if (createdItems) {
          const messagesToInsert: any[] = [];
          for (let i = 0; i < items.length; i++) {
            if (items[i].message && createdItems[i]) {
              messagesToInsert.push({
                item_id: createdItems[i].id,
                message_text: items[i].message.text,
                is_hidden: items[i].message.isHidden || false,
              });
            }
          }
          if (messagesToInsert.length > 0) {
            await supabaseClient.from("messages").insert(messagesToInsert);
          }
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Bouquet updated" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
