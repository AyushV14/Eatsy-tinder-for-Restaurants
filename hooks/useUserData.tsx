import { useUser } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function useUserData() {
  const { user, isLoaded: clerkLoaded } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const dbUser = useQuery(
    api.user.getUserByEmail,
    userEmail ? { email: userEmail } : 'skip'
  );

  return {
    userData: dbUser,
    isLoading: !clerkLoaded || dbUser === undefined,
  };
}