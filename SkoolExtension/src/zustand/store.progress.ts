import { create } from 'zustand';




interface ProgressEvent {
    currentCount?: number;
    totalCount?: number;
    textContent?: any;
}

let settings: ProgressEvent = {
    currentCount: 0,
    totalCount: 0,
    textContent: '-'
};

export interface ProgressState {
    actions:{setProgress: (settings: ProgressEvent) => void;};
    settings: ProgressEvent;
}

export const useProgressStore = create<ProgressState>((set) => ({

    settings,
    actions: {
        setProgress: (settings: ProgressEvent) => {
            // @ts-ignore
            set((state) => ({
                settings: {...state.settings,...settings}
            }));
        },
    },
}));
