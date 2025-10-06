import { useAuth } from '@/contexts/auth-context';
import { Redirect } from 'expo-router';

export default function Index() {
  const { state } = useAuth();

  if (state.isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/auth/phone-entry" />;
}

