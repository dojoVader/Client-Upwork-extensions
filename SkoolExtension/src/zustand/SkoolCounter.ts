// create zustand store counter
import {create} from 'zustand';
import "../component/style/clock.css";

interface ClockState {
    data: { time: number,counting: boolean};
    actions: any;

}

export const useCounterStore = create<ClockState>((set) => ({
    data:{
        time: 0,
        counting: false
    },
    actions: {
        setClock: (data: {time: number, counting: boolean}) => {
            set((state) => ({
                data: {...state.data,...data}
            }));
        },
    }

}));

