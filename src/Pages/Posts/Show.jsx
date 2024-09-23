import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../../Context/AppContext"

export default function Show() {
    const { id } = useParams()
    const { user, token } = useContext(AppContext)
    const [post, setPost] = useState(null)
    const navigate = useNavigate()

    const getPost = async () => {
        const res = await fetch(`/api/posts/${id}`)
        const data = await res.json()
        if (res.ok) {
            setPost(data.post)
        }
    }
    const handleDelete = async (e) => {
        e.preventDefault()
        if (user && user.id === post.user_id) {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'delete',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = await res.json()
            console.log(data)
            if (res.ok) {
                navigate('/')
            }
        }

    }

    useEffect(() => {
        getPost()
    }, [])

    return (
        <div className="max-w-7xl mx-auto">
            {post ? (<div className="mb-4 border rounded-md border-slate-400 p-4">
                <div className="mb-2 flex items-start justify-between">
                    <div>
                        <h2 className="font-bold text-2xl">{post.title}</h2>
                        <small className="text-sm text-slate-600">Created by {post.user.name} on {new Date(post.created_at).toLocaleTimeString()}</small>
                        {user && user.id === post.user_id &&
                            <div className="inline-flex">
                                <Link to={`/posts/update/${post.id}`} className="bg-green-500 text-white text-sm rounded-lg px-3 py-1 ml-2">Update</Link>
                                <form onSubmit={handleDelete}>
                                    <button className="bg-red-500 text-white text-sm rounded-lg px-3 py-1 ml-2">Delete</button>
                                </form>
                            </div>
                        }
                    </div>
                </div>
                <p>{post.body}</p>
            </div>) : (<p>Post not found</p>)}
        </div>
    )
}