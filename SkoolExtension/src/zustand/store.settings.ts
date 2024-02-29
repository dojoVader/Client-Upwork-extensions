import { create } from 'zustand';

export const screen = {
    WELCOME: "WELCOME",
    SETTINGS: "SETTINGS",
    PROGRESS: "PROGRESS",
}


interface Settings {
    currentScreen?: string;
}

let settings: Settings = {
    currentScreen: screen.WELCOME
};

export interface SettingsState {
    actions:{setSettings: (settings: Settings) => void;};
    settings: Settings;
}

export const useSettingsStore = create<SettingsState>((set) => ({

    settings,
    actions: {
        setSettings: (settings: Settings) => {
            // @ts-ignore
            set((state) => ({
                settings: {...state.settings,...settings}
            }));
        },
    },
}));
