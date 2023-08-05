import db from "../../firebase/config";
import { authSlice } from "./authReducer";

export const authSignUpUser = ({ email, password, name }) => async (
    dispatch,
    getState
) => {
    try {
    await db.auth().createUserWithEmailAndPassword(email, password);

    const user = db.auth().currentUser;

    await user.updateProfile({
        displayName: name,
    });

    const { displayName, uid } = db.auth().currentUser;

    const userUpdateProfile = {
        name: displayName,
        userId: uid,
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
    const user = await db.auth().signInWithEmailAndPassword(email, password);
    console.log("user", user);
    } catch (error) {
    console.log("error", error);
    console.log("error.code", error.code);
    console.log("error.message", error.message);
    }
};

export const authSignOutUser = () => async (dispatch, getState) => {
    await db.auth().signOut();
    dispatch(authSlice.actions.authSignOut());
};

export const authStateCahngeUser = () => async (dispatch, getState) => {
    db.auth().onAuthStateChanged((user) => {
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