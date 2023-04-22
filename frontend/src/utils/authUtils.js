import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export async function login(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}