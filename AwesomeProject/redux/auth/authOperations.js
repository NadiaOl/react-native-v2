import { authSlice } from "./authReducer";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";

export const authSignUpUser = ({ email, password, name }) => async (
    dispatch,
    getState
) => {
    try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;

        console.log('user', user.email)

        await updateProfile(auth.currentUser, {
            displayName: name,
        })

// const {uid, displayName} = await auth.currentUser;

const userUpdateProfile = await {
    name: user.displayName,
    email: user.email,
    userId: user.uid,
    stateChange: true,
};

    console.log('userUpdateProfile', userUpdateProfile)

    dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));

    } catch (error) {
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
                email: user.email,
                userId: user.uid,
            };


            dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
            dispatch(authSlice.actions.authStateChange({ stateChange: true }));
        }
    });
};