import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAPI = (
  url?: string,
  param?: {
    searchParams?: string | Array<string>;
    pathParams?: Record<string, unknown>;
    enabled?: boolean;
    queryKey?: string;
  }
) => {
  const cleanedPath =
    typeof param?.searchParams === "string"
      ? param.searchParams
      : Array.isArray(param?.searchParams)
        ? param.searchParams.join("/") + "/tickers"
        : "";

  const token = import.meta.env.VITE_IEX_TOKEN;

  return useQuery({
    enabled: param?.enabled || false,
    queryKey: ["historical", param?.queryKey || ""],
    queryFn: async () =>
      await axios
        .get(
          url
            ? `${url}?token=${token}`
            : `http://localhost:3001/sailx/${cleanedPath}`,
          {
            ...(!url ? { params: param?.pathParams } : {}),
          }
        )
        .then((res) => res.data),
  });
};

export default useAPI;
