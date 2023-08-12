import { authSlice } from "./authReducer";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export const authSignUpUser = ({ email, password, name }) => async (
    dispatch,
    getState
) => {
    try {
        const auth = getAuth();
        const user = await createUserWithEmailAndPassword(auth, email, password)

    await user.updateProfile({
        displayName: name,
    });

    const userUpdateProfile = {
        name: user.displayName,
        userId: user.uid,
        stateChange: true,
    };

    dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));

    } catch (error) {
    console.log("error", error);

    console.log("error.message", error.message);
    }
};

export const authSignInUser = ({ email, password }) => async (
    dispatch,
    getState
) => {
    try {
        const auth = getAuth();
        const user = await signInWithEmailAndPassword(auth, email, password)
    console.log("user", user);
    } catch (error) {
    console.log("error", error);
    console.log("error.code", error.code);
    console.log("error.message", error.message);
    }
};

export const authSignOutUser = () => async (dispatch) => {
    const auth = getAuth();
    await signOut(auth);
    dispatch(authSlice.actions.authSignOut());
};

export const authStateCahngeUser = () => async (dispatch, getState) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userUpdateProfile = {
                name: user.displayName,
                userId: user.uid,
            };


            dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
            dispatch(authSlice.actions.authStateChange({ stateChange: true }));
        }
    });
};