"use client";

import { useQuery } from "@apollo/client/react";

import { GET_USERS } from "@/lib/graphql/queries/user.queries";
import { User } from "@/types/user";

export function useUsers(limit = 10, offset = 0) {
  const { data, loading, error, refetch } = useQuery<{ users: User[] }>(GET_USERS, {
    variables: { limit, offset },
  });

  return {
    users: (data?.users || []) as User[],
    loading,
    error,
    refetch,
  };
}
