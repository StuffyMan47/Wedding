import { ReactNode } from 'react'
import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient } from '@tanstack/react-query'

//import '../app/styles/index.css'

interface QueryClientProviderProps {
    children: ReactNode
}

export function QueryClientProvider(props: QueryClientProviderProps) {
    const { children } = props

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                
                retry: false,
                refetchOnWindowFocus: false,
            },
        }
    })
    return (
        <TanStackQueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools
                initialIsOpen={false}
                errorTypes={[
                    {
                        name: '500',
                        initializer: () => new Error('Internal Server Error'),
                    },
                ]}
            />
        </TanStackQueryClientProvider>
    )
}
