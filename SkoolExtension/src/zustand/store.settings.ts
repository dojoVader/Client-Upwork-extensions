import { create } from 'zustand';
import {WondrAsset} from "../wondr-react/interfaces/interface";

interface WondrSettings {
    sidebarEnabled?: boolean;
    activeMain?: boolean;
    activeCategories?: []
    activeAssets?:[WondrAsset?],
    showLogin?: boolean,
    showRegister?: boolean,
    authenticated?: boolean,
    currentAsset?: WondrAsset[] | null
    currentCategory?: string | null
}

let settings: WondrSettings = {
    sidebarEnabled: false,
    activeAssets:[],
    activeCategories:[],
    activeMain: false,
    showRegister: false,
    showLogin:true,
    authenticated:false,
    currentAsset: [],
    currentCategory: null

};

export interface WondrSettingsState {
    actions: any;
    settings: WondrSettings;
}

export const useSettingsStore = create<WondrSettingsState>((set) => ({
    settings,
    actions: {
        setSettings: (settings: WondrSettings) => {
            // @ts-ignore
            set((state) => ({
                settings: {...state.settings,...settings}
            }));
        },
    },
}));
