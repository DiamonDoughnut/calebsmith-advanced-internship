import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ModalStates {
    signupModalOpen: boolean;
    loginModalOpen: boolean;
    forgotPasswordModalOpen: boolean;
}

const initialState: ModalStates = {
    signupModalOpen: false,
    loginModalOpen: false,
    forgotPasswordModalOpen: false,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openSignupModal: (state) => {
            state.signupModalOpen = true;
        },
        closeSignupModal: (state) => {
            state.signupModalOpen = false;
        },
        openLoginModal: (state) => {
            state.loginModalOpen = true;
        },
        closeLoginModal: (state) => {
            state.loginModalOpen = false;
        },
        openForgotPasswordModal: (state) => {
            state.forgotPasswordModalOpen = true;
        },
        closeForgotPasswordModal: (state) => {
            state.forgotPasswordModalOpen = false;
        },
    }
})

export const {
    openLoginModal,
    closeLoginModal,
    openSignupModal,
    closeSignupModal,
    openForgotPasswordModal,
    closeForgotPasswordModal,
} = modalSlice.actions;

export const selectSignUpModalOpen = (state: RootState) =>
    state.modals.signupModalOpen;
export const selectLogInModalOpen = (state: RootState) =>
    state.modals.loginModalOpen;
export const selectForgotPasswordModalOpen = (state: RootState) => 
    state.modals.forgotPasswordModalOpen;

export default modalSlice.reducer;  

