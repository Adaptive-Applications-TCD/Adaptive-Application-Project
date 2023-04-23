import { auth } from './firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export async function login(email, password) {
    try {
        console.log('Logged In as: ' + email)
        await signInWithEmailAndPassword(auth, email, password)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

export async function logout() {
    await auth.signOut()
    console.log('Logged Out')
}