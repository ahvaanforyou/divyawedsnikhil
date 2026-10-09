import { createClient } from '@supabase/supabase-js';

export interface BlessingItem {
  id: string;
  name: string;
  city: string | null;
  message: string;
  created_at?: string;
}

const SUPABASE_URL = 'https://ekmobqyfwzyoqkpwihun.supabase.co';
const SUPABASE_KEY = 'sb_publishable_48RlgrD2RirZ85gyRJzsTA_kdNillw3';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const WEDDING_TAG = '[divya-nikhil]';
const FALLBACK_KEY = 'divya_nikhil_blessings_cache';

export const defaultSeedBlessings: BlessingItem[] = [
  {
    id: 'seed-1',
    name: 'Karthik & Sneha',
    city: 'Bengaluru',
    message: 'Wishing Divya and Nikhil a lifetime of unconditional love, harmony, and endless laughter!',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'seed-2',
    name: 'Auntie Sunita & Family',
    city: 'Delhi',
    message: 'May God shower His divine blessings and everlasting joy upon both of you as you embark on this beautiful sacred bond.',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'seed-3',
    name: 'Rohan Mehta',
    city: 'Mumbai',
    message: 'So thrilled to celebrate your special day. Heartiest congratulations Divya & Nikhil!',
    created_at: new Date().toISOString(),
  },
];

/**
 * Strips the internal wedding tag from blessing message
 */
function cleanMessage(msg: string): string {
  return msg.replace(/^\[divya-nikhil\]\s*/i, '').replace(/\[divya-nikhil\]/gi, '').trim();
}

/**
 * Fetches all persistent blessings for Divya & Nikhil from Supabase.
 * Falls back to local cache or seed blessings if offline.
 */
export async function fetchBlessings(): Promise<BlessingItem[]> {
  try {
    const { data, error } = await supabase
      .from('blessings')
      .select('id, name, city, message, created_at')
      .like('message', `%${WEDDING_TAG}%`)
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;

    if (data && data.length > 0) {
      const sanitized: BlessingItem[] = data.map((item) => ({
        id: item.id,
        name: item.name,
        city: item.city,
        message: cleanMessage(item.message),
        created_at: item.created_at,
      }));

      try {
        localStorage.setItem(FALLBACK_KEY, JSON.stringify(sanitized));
      } catch (_) {}

      return sanitized;
    }
  } catch (err) {
    console.warn('Supabase fetch failed or network offline, checking local cache:', err);
  }

  // Check local cache
  try {
    const cached = localStorage.getItem(FALLBACK_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (_) {}

  return defaultSeedBlessings;
}

/**
 * Adds a new blessing permanently to Supabase and updates local cache.
 */
export async function addBlessing(name: string, city: string | null, message: string): Promise<BlessingItem> {
  const trimmedName = name.trim();
  const trimmedCity = city ? city.trim() : null;
  const trimmedMessage = message.trim();
  const taggedMessage = `${WEDDING_TAG} ${trimmedMessage}`;

  const newBlessing: BlessingItem = {
    id: 'temp-' + Date.now(),
    name: trimmedName,
    city: trimmedCity,
    message: trimmedMessage,
    created_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('blessings')
      .insert({
        name: trimmedName,
        city: trimmedCity,
        message: taggedMessage,
      })
      .select('id, name, city, message, created_at')
      .single();

    if (error) throw error;

    if (data) {
      newBlessing.id = data.id;
      newBlessing.created_at = data.created_at;
    }
  } catch (err) {
    console.warn('Supabase insert failed, saving to local cache as fallback:', err);
  }

  // Persist into localStorage cache so it is immediately visible on reload
  try {
    const cached = localStorage.getItem(FALLBACK_KEY);
    const list: BlessingItem[] = cached ? JSON.parse(cached) : [...defaultSeedBlessings];
    const updated = [newBlessing, ...list.filter((b) => b.id !== newBlessing.id)];
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(updated));
  } catch (_) {}

  return newBlessing;
}
