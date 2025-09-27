import { create } from "zustand";

interface ModalsStoreType {
   deleteConfirmationWindowInfo: {
      onCancel: () => void;
      onConfirm: () => void;
      message: string;
   } | null;
   setDeleteConfirmationWindowInfo: (
      deleteConfirmationWindowInfo: {
         onCancel: () => void;
         onConfirm: () => void;
         message: string;
      } | null
   ) => void;
}

export const useModalsStore = create<ModalsStoreType>((set) => ({
   deleteConfirmationWindowInfo: null,

   setDeleteConfirmationWindowInfo: (deleteConfirmationWindowInfo) =>
      set({ deleteConfirmationWindowInfo }),
}));
