import React from "react";
import clsx from "clsx";
import { SettingContext } from "../../Context/SettingContext";
import { v4 } from "uuid";
import Button from "../../components/Ultility/Button";
export default function Auth(): React.JSX.Element {
    const { settingtState } = React.useContext(SettingContext)
    const [action, setAction] = React.useState<string>("login")
    const { title, content } = (() => {
        switch (action) {
            case "login":
                return { title: "Welcome to Note", content: "Please log in to continue" }
            case "forgot":
                return { title: "Forgotten your password?", content: "Enter your email below, and we’ll send you a link to reset it." }
            case "reset":
                return { title: "Reset Your Password", content: "Choose a new password to secure your account." }
            case "signup":
                return { title: "Create Your Account", content: "Sign up to start organizing your notes and boost your productivity." }
            default: return { title: "Welcome to Note", content: "Please log in to continue" }
        }
    })();
    const submit = () => {

    }
    return (
        <div className={clsx("w-full h-full min-h-[100vh] flex items-center justify-center", {
            "bg-[var(--blue-50)]": settingtState.theme == "light",
            "bg-[var(--neutral-700)]": settingtState.theme == "dark"

        })}>
            <div className={clsx("w-1/3 tb:w-3/4 mb:container mb:max-w-none rounded-md  px-16 py-12", {
                "bg-white text-[var(--neutral-950)]": settingtState.theme == "light",
                "bg-[var(--neutral-950)] text-white": settingtState.theme == "dark",
            })}>
                <img src={`./assets/images/${settingtState.theme == "light" ? "logo" : "logo-dark"}.svg`} alt="logo" className="mx-auto object-cover w-24 h-7" />
                <h1 className="text-center h1 mt-4 mb-2">{title}</h1>
                <p className="text-center h5 text-[var(--neutral-400)]">{content}</p>
                <form noValidate className={clsx("mt-8 flex gap-4 flex-col", {
                    "text-[var(--neutral-950)]": settingtState.theme == "light",
                    "text-white": settingtState.theme == "dark",
                })}>
                    <fieldset >
                        <label className="h4" htmlFor="email">Email Address</label>
                        <input type="email" name="email" className="px-4 py-3 outline-none cursor-pointer focus:bg-[var(--neutral-50)] rounded-lg mt-2 w-full border-solid border-[1px] border-[var(--neutral-200)]" placeholder="email@example.com" />
                    </fieldset>

                    <fieldset>
                        <label className="h4 flex justify-between" htmlFor="password">Password <span className="underline cursor-pointer">Forgot</span></label>
                        <input type="password" name="password" className="px-4 py-3 outline-none cursor-pointer focus:bg-[var(--neutral-50)] rounded-lg mt-2 w-full border-solid border-[1px] border-[var(--neutral-200)]" />
                    </fieldset>
                    <Button key={v4()} bgColor={"var(--blue-500)"} textColor={"var(--neutral)"} clickEvent={submit} text={action.toUpperCase()} />
                    <div className="w-full h-[1px] bg-[var(--neutral-200)]"></div>
                    <p className="h5 text-[var(--neutral-400)] text-center">Or log in with:</p>
                    <button type="button" className="h4 py-3 px-14 w-full bg-[var(--neutral-50)] flex items-end justify-center gap-2 round-8 text-center cursor-pointer hover:bg-[var(--neutral-50)] ">
                        <i className="w-6 h-6 block bg-[var(--neutral-950)]" style={{ mask: "url(./assets/images/icon-google.svg) center / cover no-repeat", WebkitMask: "url(./assets/images/icon-google.svg) center / cover no-repeat" }}></i>
                        Google
                    </button>
                    <div className="w-full h-[1px] bg-[var(--neutral-200)]"></div>
                    <p className="h5 text-center">No account yet? <span className="underline">Sign Up</span></p>
                </form>
            </div>

        </div>
    )
}