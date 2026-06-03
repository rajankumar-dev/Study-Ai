import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/userApi";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
    const { login } = useAuth();

    const [form, setForm] = useState({
        name: "",
        email: "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();

                setForm({
                    name: data.name || "",
                    email: data.email || "",
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const updated = await updateProfile(form);

            login(
                localStorage.getItem("token"),
                updated
            );

            toast.success(
                "Profile updated successfully"
            );
        } catch (error) {
            console.log(error);
            toast.error(
                "Failed to update profile"
            );
        }
    };

    return (
        <div className="rounded-lg">



            {/* PROFILE CARD */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-10">

                {/* AVATAR */}
                <div className="flex flex-col items-center mb-8">

                    <div className="w-28 h-28 rounded-full bg-blue-500 flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                        {form.name
                            ? form.name.charAt(0).toUpperCase()
                            : "U"}
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
                        {form.name || "User"}
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400">
                        {form.email}
                    </p>

                </div>

                {/* FORM */}
                <form
                    onSubmit={handleUpdate}
                    className="space-y-6"
                >

                    {/* NAME */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }
                            className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value,
                                })
                            }
                            className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
                    >
                        Save Changes
                    </button>

                </form>

            </div>

        </div>
    );
}