import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Home() {
    const [posts, setPosts] = useState([])
    const getPosts = async () => {
        const res = await fetch('/api/posts')
        const data = await res.json()
        if (res.ok) {
            setPosts(data)
        }
    }
    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-4xl font-extrabold mb-4">Latest posts</h2>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id} className="mb-4 border rounded-md border-slate-400 p-4">
                        <div className="mb-2 flex items-start justify-between">
                            <div>
                                <h2 className="font-bold text-2xl">{post.title}</h2>
                                <small className="text-sm text-slate-600">Created by {post.user.name} on {new Date(post.created_at).toLocaleTimeString()}</small>
                            </div>
                            <Link to={`/posts/${post.id}`} className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1">Read more</Link>
                        </div>
                        <p>{post.body}</p>
                    </div>
                ))
            )
                :
                (<p>There are no posts</p>)}
        </div>
    )
}