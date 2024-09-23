import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../Context/AppContext"

export default function Register() {

    const navigate = useNavigate()
    const { setToken } = useContext(AppContext)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',

    })

    const [errors, setErrors] = useState({})

    const handleRegister = async (e) => {
        e.preventDefault()
        const res = await fetch('/api/register', {
            method: "post",
            body: JSON.stringify(formData)
        })

        const data = await res.json()

        if (data.errors) {
            setErrors(data.errors)
        } else {
            localStorage.setItem('token', data.token)
            setToken(data.token)
            // navigate('/')
            console.log(data)
        }

    }

    return (
        <>
            <h2 className="text-center text-4xl font-extrabold">Register a new account</h2>
            <form className="w-1/2 mx-auto pt-4" onSubmit={handleRegister}>
                <div className="mb-5">
                    <input className="w-full border border-gray-400 p-2 h-12 rounded-md" type="text" name="name" id="name" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    {errors.name && <p className="text-pink-500 text-sm">{errors.name[0]}</p>}
                </div>
                <div className="mb-5">
                    <input className="w-full border p-2 h-12  border-gray-400  rounded-md" type="text" name="email" id="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    {errors.email && <p className="text-pink-500 text-sm">{errors.email[0]}</p>}

                </div>
                <div className="mb-5">
                    <input className="w-full border p-2 h-12  border-gray-400  rounded-md" type="password" name="password" id="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    {errors.password && <p className="text-pink-500 text-sm">{errors.password[0]}</p>}

                </div>
                <div className="mb-5">
                    <input className="w-full border p-2 h-12   border-gray-400 rounded-md" type="password" name="password-confirmation" id="password-confirmation" placeholder="Confirm Password" value={formData.password_confirmation} onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })} />
                </div>
                <div className="mb-5">
                    <button className="w-full border p-2 h-12 rounded-md bg-blue-500 text-white font-bold text-lg" >Register</button>
                </div>
            </form>
        </>
    )
}