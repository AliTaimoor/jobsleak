// icon:loading | Ant Design Icons https://ant.design/components/icon/ | Ant Design
import * as React from 'react'

interface LoadingIconProps {
    size?: 'xs' | 'sm' | 'md' | 'lg'
}

function LoadingIcon({ size = 'lg' }: LoadingIconProps): JSX.Element {
    let sizeStyle = ''
    switch (size) {
        case 'xs':
            sizeStyle = 'w-4'
            break
        case 'sm':
            sizeStyle = 'w-6'
            break
        case 'md':
            sizeStyle = 'w-8'
            break
        case 'lg':
            sizeStyle = 'w-12'
            break
        default:
            sizeStyle = 'w-8'
    }
    return (
        <span className="loading loading-spinner text-primar-500 bg-primary-500 loading-lg"></span>
    )
}

export default LoadingIcon
