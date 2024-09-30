import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "@/components/providers/socket-provider";

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();

  const fetchMessages = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
          [paramKey]: paramValue,
        },
      }, { skipNull: true }
    );

    const response = await fetch(url);
    return response.json();
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
      useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        // refetchInterval: isConnected ? false : 1000, // change to constant 1000 if seeing socket error
        refetchInterval: 1000,
        initialPageParam: undefined, // Add the initialPageParam property - idk
      });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};

export default useChatQuery;
