import { QueryClient } from "@tanstack/react-query";
import queryClientConfig from "../config";

const getClientSideQueryClient = () => new QueryClient(queryClientConfig);

export default getClientSideQueryClient;