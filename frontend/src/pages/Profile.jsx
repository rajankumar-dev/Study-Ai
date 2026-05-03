import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/userApi";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
    const { user, login } = useAuth();

    const [form, setForm] = useState({
        name: "",
        email: "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await getProfile();
            setForm({
                name: data.name,
                email: data.email,
            });
        };
        fetchProfile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("Update clicked");
        const updated = await updateProfile(form);

        // 🔥 update context + localStorage
        login(localStorage.getItem("token"), updated);

        alert("Profile updated");
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-4">My Profile</h2>

            <form onSubmit={handleUpdate} className="space-y-4">

                <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg"
                    placeholder="Name"
                />

                <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg"
                    placeholder="Email"
                />

                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Save Changes
                </button>

            </form>
        </div>
    );
}