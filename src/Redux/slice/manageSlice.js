import { createSlice } from "@reduxjs/toolkit";

const manageSlice = createSlice({
  name: "manage",
  initialState: {
    setting:{
      acitveSidbar: 'chats',
      isGroupModalOpen: false,
      isGroupModalInfoOpen: false,
      isAddMemberGroupModalOpen: false,
      room:null
    }
  },
  reducers: {
    changesSidebar: (state, action) => {
      state.setting.acitveSidbar = action.payload
    },
    toggleGroupModal: (state, action) => {
      state.setting.isGroupModalOpen = action.payload
    },
    toggleAddMemberGroupModal: (state, action) => {
      state.setting.isAddMemberGroupModalOpen = action.payload
    },
    selectedRoom: (state, action) => {
      state.setting.room = action.payload
    },
    toggleGroupInfoModal: (state, action) => {
      state.setting.isGroupModalInfoOpen = action.payload
    },
  },
});

// this is for dispatch
export const { changesSidebar, toggleGroupModal, selectedRoom, toggleAddMemberGroupModal,toggleGroupInfoModal } = manageSlice.actions;

// this is for configureStore
export default manageSlice.reducer;