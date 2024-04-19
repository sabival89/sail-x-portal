import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAPI = (
  queryKey: string,
  param: {
    searchParams: string | Array<string>;
    pathParams?: Record<string, unknown>;
    enabled?: boolean;
  }
) => {
  const cleanedPath =
    typeof param.searchParams === "string"
      ? param.searchParams
      : Array.isArray(param.searchParams)
        ? param.searchParams.join("/")
        : "";

  return useQuery({
    enabled: param.enabled || false,

    queryKey: [queryKey],

    queryFn: async () =>
      await axios
        .get(`http://localhost:3001/sailx/${cleanedPath}`, {
          params: param.pathParams,
        })
        .then((res) => res.data),
  });
};

export default useAPI;
