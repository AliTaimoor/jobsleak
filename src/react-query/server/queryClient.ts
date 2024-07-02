import { QueryClient } from "@tanstack/react-query";
import queryClientConfig from "../config";
import { cache } from "react";

const getServerSideQueryClient = cache(() => new QueryClient(queryClientConfig));

export default getServerSideQueryClient;