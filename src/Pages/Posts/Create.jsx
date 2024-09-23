import { useContext, useState } from "react"
import { AppContext } from "../../Context/AppContext"
import { useNavigate } from "react-router-dom"

export default function Create() {
    const navigate = useNavigate()
    const { token } = useContext(AppContext)
    const [formData, setFormData] = useState({
        title: "",
        body: "",
    })
    const [errors, setErrors] = useState({})
    const handleCreate = async (e) => {
        e.preventDefault()
        const res = await fetch('/api/posts', {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        if (data.errors) {
            setErrors(data.errors)
        } else {
            navigate('/')
        }
        console.log(data)
    }
    return (
        <>
            <h2 className="text-center text-4xl font-extrabold">Create a new post</h2>
            <form className="w-1/2 mx-auto mt-2" onSubmit={handleCreate}>
                <div className="mb-5">
                    <input className="w-full h-12 border-2 rounded-md text-lg p-2" type="text" placeholder="Post Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    {errors.title && <p className="text-sm text-pink-500">{errors.title}</p>}
                </div>
                <div className="mb-5">
                    <textarea className="border-2 rounded-md w-full text-lg p-2" placeholder="Post Content" rows="6" value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })}></textarea>
                    {errors.body && <p className="text-sm text-pink-500">{errors.body}</p>}
                </div>
                <button className="bg-blue-500 w-full text-white h-12 rounded text-lg font-bold">Create</button>
            </form>
        </>
    )
}