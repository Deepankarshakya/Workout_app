import * as Linking from 'expo-linking';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useDeepLink() {
  const url = Linking.useLinkingURL();

  useEffect(() => {
    if (url) {
      createSessionFromUrl(url);
    }
  }, [url]);
}

export async function createSessionFromUrl(url: string) {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) {
    console.error('Deep link error:', errorCode);
    return;
  }

  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (error) {
    console.error('Session error:', error.message);
  }
}