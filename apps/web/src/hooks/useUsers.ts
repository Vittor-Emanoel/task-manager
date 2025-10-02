import { usersService } from "@/services/usersService"
import { useQuery } from "@tanstack/react-query"

export const useUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll
  })

  return {
    users: data ?? data,
    isLoadingUser: isLoading
  }
}