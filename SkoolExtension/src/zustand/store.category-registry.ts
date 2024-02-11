import { create } from 'zustand';

type filterCategory = {
    category: [string?];
}

let filteredCategory: any = {
  category: []
};

export interface FilteredCategory {
    actions: any;
    category: [string?];
}

export const useFilteredCategory = create<FilteredCategory>((set) => ({
    category: filteredCategory.category,
    actions: {
        setData: (data: filterCategory) => {
            // @ts-ignore
            set((state) => ({
                category: [...state.category,...data.category]
            }));
        },
    },
}));
