import React from "react";
const useFormAction = () => {
    const [action, setAction] = React.useState<string>("login")
    const { title, content, button } = (() => {
        switch (action) {
            case "login":
                return { title: "Welcome to Note", content: "Please log in to continue", button: "Login" }
            case "forgot":
                return { title: "Forgotten your password?", content: "Enter your email below, and we’ll send you a link to reset it.", button: "Send Reset Link" }
            case "reset":
                return { title: "Reset Your Password", content: "Choose a new password to secure your account.", button: "Reset Password" }
            case "signup":
                return { title: "Create Your Account", content: "Sign up to start organizing your notes and boost your productivity.", button: "Sign up" }
            default: return { title: "Welcome to Note", content: "Please log in to continue", button: "Login" }
        }
    })();
    return { title, content, button, action, setAction }
}
export default useFormAction