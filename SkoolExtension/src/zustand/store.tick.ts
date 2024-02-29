import { create } from 'zustand';




interface Tick {
    triggerClock: boolean;
}

let settings: Tick = {
    triggerClock: false
};

export interface TickState {
    actions:{setTick: (settings: Tick) => void;};
    settings: Tick;
}

export const useTickStore = create<TickState>((set) => ({

    settings,
    actions: {
        setTick: (settings: Tick) => {
            // @ts-ignore
            set((state) => ({
                settings: {...state.settings,...settings}
            }));
        },
    },
}));
