import { create } from 'zustand';
import {MemberstackPlans} from "../wondr-react/interfaces/interface";

interface PremiumSettings {
    plans?: MemberstackPlans[];
}

let plans: PremiumSettings = {
    plans: null,
};

export interface PremiumState {
    actions: any;
    plans: PremiumSettings;
}

export const usePremiumStore = create<PremiumState>((set) => ({
    plans,
    actions: {
        setPlans: (plans: { plans: any }) => {
            // @ts-ignore
            set((state) => ({
                plans
            }));
        },
    },
}));
