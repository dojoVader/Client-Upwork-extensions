// const actions = useSettingsStore(state => state.actions);
// const memberstackPlans = usePremiumStore(state => state.plans);

import { create } from 'zustand';
import {WondrAsset} from "../wondr-react/interfaces/interface";

let airtableData: any = {
  data: []
};

export interface AirtableData {
    actions: any;
    data: [];
}

export const useAirtableData = create<AirtableData>((set) => ({
    data: airtableData.data,
    actions: {
        setData: (data: AirtableData) => {
            set((state) => ({
                data: {...state.data,...data}
            }));
        },
    },
}));
