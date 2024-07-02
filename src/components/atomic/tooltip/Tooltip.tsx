import React from 'react'


interface TooltipProps {
    trigger: React.ReactNode
    content: string
}
const Tooltip = ({ trigger, content }: TooltipProps) => {
    return (
        <div className="tooltip  tooltip-top" data-tip={content}>
            {trigger}
        </div>
    )
}

export default Tooltip