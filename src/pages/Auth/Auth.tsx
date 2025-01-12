import React, { FormHTMLAttributes } from "react";
import clsx from "clsx";
import { SettingContext } from "../../Context/SettingContext";
import { v4 } from "uuid";
import Button from "../../components/Ultility/Button";

interface FormField {
    value: string,
    state: StatusType,
    message?: string
}

interface Form {
    email?: FormField,
    password?: FormField,
    confirmPassword?: FormField,
    [key: string]: FormField | undefined
}
const initData: Form = {
    email: {
        value: "",
        state: "default",
        message: ""
    },
    password: {
        value: "",
        state: "default",
        message: ""
    },
    confirmPassword: {
        value: "",
        state: "default",
        message: ""
    }
}
export default function Auth(): React.JSX.Element {
    const { settingtState } = React.useContext(SettingContext)
    const [action, setAction] = React.useState<string>("login")
    const [formData, setFormData] = React.useState<Form>(initData)
    const [showPass, setShowPass] = React.useState<{ pass: boolean, confirm: boolean }>({ pass: false, confirm: false })
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const name = e.target.name
        const newFormData = formData
        newFormData[name] = {
            state: "typing",
            value: value
        }
        setFormData({ ...newFormData })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let isNotValid = false
        const newFormData = formData
        for (const key in newFormData) {
            const fieldData = newFormData[key];
            if (!fieldData) {
                newFormData[key] = {
                    ...newFormData[key], state: "error", message: "This field is required", value: newFormData[key]?.value || ""
                }
                isNotValid = true
                continue
            }
            if (key == "email" && !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(newFormData[key]?.value ?? "")) {
                newFormData[key] = {
                    ...newFormData[key], state: "error", message: "Email is not valid", value: newFormData[key]?.value || ""
                }
                isNotValid = true
            }
            if ((key == "password") && !(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(newFormData[key]?.value ?? "")) {
                newFormData[key] = {
                    ...newFormData[key], state: "error", message: "Password 8 chacrater, 1 Uppercase, 1 lowercase , 1 number , 1 special symbol ", value: newFormData[key]?.value || ""
                }
                isNotValid = true
            }
            if (key == "confirmPassword" && (newFormData["password"] == newFormData["confirmPassword"])) {
                newFormData[key] = {
                    ...newFormData[key], state: "error", message: "Confirm password need same password", value: newFormData[key]?.value || ""
                }
                isNotValid = true
            }
        }
        setFormData({ ...newFormData })
        // if(!isNotValid) {

        // }
    }
    return (
        <div className={clsx("w-full h-full min-h-[100vh] flex items-center justify-center", {
            "bg-[var(--blue-50)]": settingtState.theme == "light",
            "bg-[var(--neutral-700)]": settingtState.theme == "dark"

        })}>

            <div className={clsx("w-1/3 tb:w-3/4 mb:container flex flex-col mb:max-w-none rounded-md  px-16 py-12", {
                "bg-white text-[var(--neutral-950)]": settingtState.theme == "light",
                "bg-[var(--neutral-950)] text-white": settingtState.theme == "dark",
            })}>

                <img src={`./assets/images/${settingtState.theme == "light" ? "logo" : "logo-dark"}.svg`} alt="logo" className="mx-auto object-cover w-24 h-7" />
                <h1 className="text-center h1 mt-4 mb-2">{title}</h1>
                <p className="text-center h5 text-[var(--neutral-400)]">{content}</p>

                <div className="flex flex-col gap-3 text-red-400 h3 mt-8 ">
                    {
                        Object.values(formData).filter(field => field?.state == "error").map(field => <p key={v4()}> - {field?.message}</p>)
                    }
                </div>

                <form onSubmit={(e) => handleSubmit(e)} noValidate className={clsx("flex mt-2 gap-4 flex-col", {
                    "text-[var(--neutral-950)]": settingtState.theme == "light",
                    "text-white": settingtState.theme == "dark",
                })}>
                    {action != "reset" &&
                        <fieldset >
                            <label className="h4" htmlFor="email">Email Address</label>
                            <input value={formData.email?.value} onChange={(e) => handleChange(e)} type="email" name="email"
                                className={clsx(`px-4 py-3 outline-none 
                            cursor-pointer focus:bg-[var(--neutral-50)] 
                            rounded-lg mt-2 w-full border-solid 
                            border-[1px] `, {
                                    "border-[var(--neutral-200)]": formData.email?.state != "error",
                                    "border-[var(--red-500)]": formData.email?.state == "error"
                                })} placeholder="email@example.com" />
                        </fieldset>
                    }

                    {action != "forgot" && <fieldset className="relative">
                        <i onClick={() => setShowPass({ ...showPass, pass: !showPass.pass })} className="w-5 h-5 block absolute right-4 top-[50%] z-10 bg-slate-400"
                            style={{ mask: `url(./assets/images/icon-${showPass.pass ? "show" : "hide"}-password.svg) center / cover no-repeat`, WebkitMask: `url(./assets/images/icon-${showPass.pass ? "show" : "hide"}-password.svg) center / cover no-repeat` }}></i>
                        <label className="h4 flex justify-between" htmlFor="password">Password <span className="underline cursor-pointer" onClick={() => setAction("forgot")}>Forgot</span></label>
                        <input value={formData.password?.value} onChange={(e) => handleChange(e)} type={!showPass.pass ? "password" : "text"} name="password"
                            className={clsx(`px-4 py-3 outline-none cursor-pointer 
                        focus:bg-[var(--neutral-50)] rounded-lg mt-2 w-full 
                        border-solid border-[1px] border-[var(--neutral-200)]`, {
                                "border-[var(--neutral-200)]": formData.password?.state != "error",
                                "border-[var(--red-500)]": formData.password?.state == "error"
                            })} />
                    </fieldset>}

                    {action == "reset" && <fieldset className="relative">
                        <i onClick={() => setShowPass({ ...showPass, pass: !showPass.pass })} className="w-5 h-5 block absolute right-4 top-[50%] z-10 bg-slate-400"
                            style={{ mask: `url(./assets/images/icon-${showPass.pass ? "show" : "hide"}-password.svg) center / cover no-repeat`, WebkitMask: `url(./assets/images/icon-${showPass.pass ? "show" : "hide"}-password.svg) center / cover no-repeat` }}></i>
                        <label className="h4 flex justify-between" htmlFor="confirmPassword">Confirm Password </label>
                        <input value={formData.confirmPassword?.value} onChange={(e) => handleChange(e)} type={!showPass.confirm ? "password" : "text"} name="confirmPassword"
                            className={clsx(`px-4 py-3 outline-none cursor-pointer 
                        focus:bg-[var(--neutral-50)] rounded-lg mt-2
                         w-full border-solid border-[1px] 
                         border-[var(--neutral-200)]` , {
                                "border-[var(--neutral-200)]": formData.password?.state != "error",
                                "border-[var(--red-500)]": formData.password?.state == "error"
                            })} />
                    </fieldset>}

                    <Button key={v4()} bgColor={"var(--blue-500)"} textColor={"var(--neutral)"} clickEvent={() => { }} text={button} />
                    <div className="w-full h-[1px] bg-[var(--neutral-200)]"></div>
                    <p className="h5 text-[var(--neutral-400)] text-center">Or log in with:</p>
                    <button type="button" className="h4 py-3 px-14 w-full bg-[var(--neutral-50)] flex items-end justify-center gap-2 round-8 text-center cursor-pointer hover:bg-[var(--neutral-50)] ">
                        <i className="w-6 h-6 block bg-[var(--neutral-950)]" style={{ mask: "url(./assets/images/icon-google.svg) center / cover no-repeat", WebkitMask: "url(./assets/images/icon-google.svg) center / cover no-repeat" }}></i>
                        Google
                    </button>
                    <div className="w-full h-[1px] bg-[var(--neutral-200)]"></div>
                    {
                        action == "login" && <p className="h5 text-center">No account yet? <span onClick={() => setAction("signup")} className="underline cursor-pointer">Sign Up</span></p>

                    }
                    {
                        action != "login" && <p className="h5 text-center"> Already have an account? <span onClick={() => setAction("login")} className="underline cursor-pointer">Login</span></p>

                    }
                </form>
            </div>

        </div>
    )
}