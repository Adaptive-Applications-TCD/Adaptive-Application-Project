import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export async function login(email, password) {
    signInWithEmailAndPassword(auth, email, password).then(() => {
        console.log('Logged In as: ' + email)
        return true
    }).catch((e) => {
        console.log('ERROR')
        return false
    })
}

export async function logout() {
    await auth.signOut()
    console.log('Logged Out')
}