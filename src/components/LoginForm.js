import { useState } from "react";
import FirebaseAuthService from "../FirebaseAuthService";

function LoginForm({ existingUser }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await FirebaseAuthService.loginUser(username, password)
            setUsername("")
            setPassword("")
        } catch (error) {
            alert(error.message)
        }
    }

    const handleLogout = () => {
        FirebaseAuthService.logoutUser()
    }

    const handleSendResetResetPasswordEmail = async () => {
        if(!username) {
            alert('Username not found')
            return
        }

        try {
            await FirebaseAuthService.sendPasswordResetEmail(username)
            alert('Sent password reset email')
        } catch (error) {
            alert(error.message)
        }
    }

    const handleLoginWithGoogle = async () => {
        try {
            await FirebaseAuthService.loginWithGoogle()
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className="login-form-container">
            {  existingUser ? 
                (<div className="row">
                    <h3>Welcome, {existingUser.email} </h3>
                    <button type="button" className="primary-button" onClick={handleLogout}>Logout</button>
                </div>) : 
                <form onSubmit={handleSubmit} className="login-form">
                    <label className="input-label login-label">
                        Username (email):
                        <input 
                            className="input-text"
                            type="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required   
                        />
                    </label>

                    <label className="input-label login-label">
                        Password:
                        <input 
                            className="input-text"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required   
                        />
                    </label>

                    <div className="button-box">
                        <button type="submit" className="primary-button">Login</button>
                        <button type="button" className="primary-button" onClick={handleSendResetResetPasswordEmail}>Reset</button>
                        <button type="button" className="primary-button" onClick={handleLoginWithGoogle}>Login with Google</button>
                    </div>
                </form>
            }
        </div>
    )
}

export default LoginForm