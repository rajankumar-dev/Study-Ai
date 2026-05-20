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

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Favorite Notes
            </h1>

            {favorites.length === 0 ? (

                <div className="bg-white rounded-2xl p-10 text-center shadow-sm">

                    <h2 className="text-xl font-semibold text-gray-700">
                        No favorite notes yet ❤️
                    </h2>

                </div>

            ) : (

                <div className="grid grid-cols-3 gap-6">

                    {favorites.map((note) => (

                        <div
                            key={note._id}
                            className="bg-white rounded-2xl p-5 shadow-sm"
                        >

                            <h2 className="font-bold text-lg mb-2">
                                {note.title}
                            </h2>

                            <p className="text-gray-500 text-sm line-clamp-3">
                                {note.content}
                            </p>

                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}