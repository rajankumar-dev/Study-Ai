import { useEffect, useState } from "react";
import { getNotes } from "../features/notes/notesApi";

export default function Favorites() {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {

        try {

            const data = await getNotes();

            const favs = data.notes.filter(
                (note) => note.favorite
            );

            setFavorites(favs);

        } catch (err) {

            console.log(err);

        }
    };

    return (

        <div className="max-w-7xl mx-auto">

            {/* HEADER */}
            <div className="mb-8">

                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                    Favorite Notes ❤️
                </h1>

                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Quickly access all your saved favorite notes.
                </p>

            </div>

            {/* EMPTY STATE */}
            {favorites.length === 0 ? (

                <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 md:p-16 text-center shadow-lg border border-gray-200 dark:border-gray-700">

                    <div className="text-6xl mb-4">
                        ❤️
                    </div>

                    <h2 className="text-2xl font-bold text-gray-700 dark:text-white">
                        No Favorite Notes Yet
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 mt-3">
                        Mark notes as favorite and they will appear here.
                    </p>

                </div>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {favorites.map((note) => (

                        <div
                            key={note._id}
                            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition duration-300"
                        >

                            {/* HEART */}
                            <div className="flex justify-between items-center mb-4">

                                <span className="text-red-500 text-2xl">
                                    ❤️
                                </span>

                            </div>

                            {/* TITLE */}
                            <h2 className="font-bold text-xl text-gray-800 dark:text-white mb-3 line-clamp-1">
                                {note.title}
                            </h2>

                            {/* CONTENT */}
                            <p className="text-gray-600 dark:text-gray-300 leading-7 line-clamp-4">
                                {note.content}
                            </p>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}