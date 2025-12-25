import { useState } from "react";


export default function MotifForm({ onSubmit, onClose }) {
    const [motif, setMotif] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(motif);
    };

    return (
        <div className="fixed inset-0  backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-lg w-full sm:max-w-lg max-w-md">
                <p className="text-xl font-semibold mb-5 dark:text-white">
                    Motif du refus
                </p>

                <form 
                    onSubmit={handleSubmit} 
                    className="space-y-5"
                >
                    <textarea 
                        value={motif}
                        onChange={(e) => setMotif(e.target.value)} 
                        placeholder="Motif du refus"
                        className="
                            w-full text-xl pl-3 pt-2 pb-8 border-l-5 border-fuchsia bg-white appearance-none rounded-sm p-2 shadow-[0_0_8px_2px_rgba(0,0,0,0.1)] dark:bg-gray-600
                            dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia cursor-pointer
                        "
                        required
                    />
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                gap-2 px-4 py-2 border border-transparent text-lg font-semibold rounded-lg text-white bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150 shadow-md
                            "
                        >
                            Annuler
                        </button>

                        <button
                            type="submit"
                            className="
                                gap-2 px-4 py-2 border border-transparent text-lg font-semibold rounded-lg text-white
                                bg-fuchsia hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia transition duration-150 shadow-md
                            "
                        >
                            Confirmer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
