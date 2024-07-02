import { QueryClientConfig } from '@tanstack/react-query'

const queryClientConfig: QueryClientConfig = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
            retry: 5,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        },
    }
}

export default queryClientConfig;