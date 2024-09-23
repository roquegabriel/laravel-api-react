import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../Context/AppContext"

export default function Login() {

    const navigate = useNavigate()
    const { setToken } = useContext(AppContext)
    const [formData, setFormData] = useState({
        email: '',
        password: '',

    })

    const [errors, setErrors] = useState({})

    const handleLogin = async (e) => {
        e.preventDefault()
        const res = await fetch('/api/login', {
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
            <h2 className="text-center text-4xl font-extrabold">Login to your account</h2>
            <form className="w-1/2 mx-auto pt-4" onSubmit={handleLogin}>
                
                <div className="mb-5">
                    <input className="w-full border p-2 h-12  border-gray-400  rounded-md" type="text" name="email" id="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    {errors.email && <p className="text-pink-500 text-sm">{errors.email[0]}</p>}

                </div>
                <div className="mb-5">
                    <input className="w-full border p-2 h-12  border-gray-400  rounded-md" type="password" name="password" id="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    {errors.password && <p className="text-pink-500 text-sm">{errors.password[0]}</p>}

                </div>
                
                <div className="mb-5">
                    <button className="w-full border p-2 h-12 rounded-md bg-blue-500 text-white font-bold text-lg" >Login</button>
                </div>
            </form>
        </>
    )
}