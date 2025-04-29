import React from 'react';
import { useTooltipStore } from '~/store/useTooltipStore';

interface TooltipProps {
    text?: string;
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text, className }) => {
    const {showTooltip} = useTooltipStore()

    if(!showTooltip) return null
    
    return (
        <div
            className={`absolute left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
            opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white ${className}`}
        >
            {text}
        </div>
    )
}

export default Tooltip;

