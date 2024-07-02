import { useTheme } from 'next-themes';
import React from 'react'

const ClientThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useTheme();
    return (
        <div data-theme={theme}>
            {children}
        </div>
    )
}

export default ClientThemeProvider