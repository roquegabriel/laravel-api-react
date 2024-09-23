import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../Context/AppContext"
import { useNavigate, useParams } from "react-router-dom"

export default function Update() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { token, user } = useContext(AppContext)
    const [formData, setFormData] = useState({
        title: "",
        body: "",
    })
    const [errors, setErrors] = useState({})

    const getPost = async () => {
        const res = await fetch(`/api/posts/${id}`)
        const data = await res.json()
        if (res.ok) {
            if (user.id !== data.post.user_id) {
                navigate('/')
            }
            setFormData({
                title: data.post.title,
                body: data.post.body,
            })

        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        const res = await fetch(`/api/posts/${id}`, {
            method: 'put',
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
    useEffect(() => {
        getPost()

    }, [])

    return (
        <>
            <h2 className="text-center text-4xl font-extrabold">Update post</h2>
            <form className="w-1/2 mx-auto mt-2" onSubmit={handleUpdate}>
                <div className="mb-5">
                    <input className="w-full h-12 border-2 rounded-md text-lg p-2" type="text" placeholder="Post Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    {errors.title && <p className="text-sm text-pink-500">{errors.title}</p>}
                </div>
                <div className="mb-5">
                    <textarea className="border-2 rounded-md w-full text-lg p-2" placeholder="Post Content" rows="6" value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })}></textarea>
                    {errors.body && <p className="text-sm text-pink-500">{errors.body}</p>}
                </div>
                <button className="bg-blue-500 w-full text-white h-12 rounded text-lg font-bold">Update</button>
            </form>
        </>
    )
}