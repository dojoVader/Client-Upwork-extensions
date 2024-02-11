import { create } from 'zustand';

interface Data {
    data: Record[];
}

interface Record {
    id:          string;
    createdTime: Date;
    fields:      Fields;
}

interface Fields {
    PriceID: string;
    Type:    string;
}

let data: Record[] = [];

export interface WondrPlans {
    actions: any;
    data: Record[];
}

export const useWondrPlans = create<WondrPlans>((set) => ({
    data,
    actions: {
        setData: (data: WondrPlans) => {
            set((state) => ({
                data: [...state.data,...data.data]
            }));
        },
    },
}));
