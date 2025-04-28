// useCurrentActivePageStore.ts
import { create } from 'zustand';

interface TooltipStoreState {
    showTooltip: boolean
    setShowTooltip: (tooltip: boolean) => void

}

export const useTooltipStore = create<TooltipStoreState>((set) => ({
    showTooltip: false,
    setShowTooltip: (tooltip) => set({ showTooltip: tooltip })
}));
