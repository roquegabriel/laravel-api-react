import { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
    const { user, token, setToken, setUser } = useContext(AppContext)
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = async (e) => {
        e.preventDefault()

        const res = await fetch('/api/logout', {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const data = await res.json()
        console.log(data)

        if (res.ok) {
            setUser(null)
            setToken(null)
            localStorage.removeItem('token')
            navigate('/')
        }

    }

    return (
        <>
            <header className="bg-slate-800 text-white mb-2">
                <nav className="max-w-7xl mx-auto flex justify-between px-2 py-8">
                    <Link to={'/'} className="font-bold text-lg inline-block w-24 p-2 rounded-md text-center hover:bg-slate-900">Home</Link>
                    {user ? (
                        <div className="text-white flex items-center" >
                            <p className="text-lg text-gray-400">Logged in as {user.name}</p>

                            {location.pathname !== '/create' && <Link to={'/create'} className=" inline-block font-bold text-lg w-28 p-2 rounded-md text-center hover:bg-slate-900 ">New post</Link>}
                            <form onSubmit={handleLogout}>
                                <button className="font-bold text-lg w-24 p-2 rounded-md text-center hover:bg-slate-900">Logout</button>
                            </form>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link to={'/register'} className=" inline-block font-bold text-lg w-24 p-2 rounded-md text-center hover:bg-slate-900 ">Register</Link>
                            <Link to={'/login'} className="font-bold text-lg inline-block w-24 p-2 rounded-md text-center hover:bg-slate-900 ">Login</Link>
                        </div>

                    )}

                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}