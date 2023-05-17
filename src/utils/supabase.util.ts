import { Database } from "../models/cc/cc.model"
import { createClient } from "@supabase/supabase-js"

export const supabaseClient = createClient<Database>(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_ANON,
)
