import { Injectable } from '@nestjs/common';
import { PostgrestError, SupabaseClient, createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase.types';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.enc.local' });

// https://www.youtube.com/watch?v=bwv2qu7M30s&t=1s
const supabase: SupabaseClient<Database> = createClient<Database>(process.env.NESTJS_PUBLIC_DATABASE_URL, process.env.NESTJS_PUBLIC_SUPABASE_KEY, { auth: { persistSession: false } });

@Injectable()
export class AppService {
  async getHello(): Promise<Database["public"]["Tables"]["sla"]["Row"][] | PostgrestError> {

    const { data, error }: { data: Database["public"]["Tables"]["sla"]["Row"][] | null, error: PostgrestError | null }
      = await supabase
        .from("sla")
        .select('*')

    if (error) { return error }
    return data
  }
}
