import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createUtilisation } from "../../../redux/slices/admin/utilisationConsommableSlice";
import { fetchConsommables } from "../../../redux/slices/admin/ConsommableSlice";
import { t } from "i18next";

export default function Emprunter({ selectedUtilisationId, onClose }) {
  const [form, setForm] = useState({
    consommableId: selectedUtilisationId || "",
    quantiteUtilise: "",
    description: "",
  });

  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.consommables);

  useEffect(() => {
    dispatch(fetchConsommables());
  }, [dispatch]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, consommableId: selectedUtilisationId }));
  }, [selectedUtilisationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "consommableId" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createUtilisation(form)).unwrap();
    setForm({ consommableId: "", quantiteUtilise: "", description: "" });
    onClose(); 
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/40">
      <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 dark:text-white max-w-md">
        <h1 className="text-3xl -ml-1 font-bold lg:flex text-center">
          {t("useConsommable")}
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-12">
            <select   
                value={form.consommableId}
                onChange={handleChange}  
                name="consommableId"
                className="w-full text-xl pl-6 py-3 border-l-5 border-fuchsia rounded-sm appearance-none bg-white shadow-[0_0_8px_2px_rgba(0,0,0,0.1)] dark:bg-gray-600  
                  dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150 cursor-pointer"
                required
            >
              {items.length === 0 ? (
                <option value="">{t("noConsommableAvailable")}</option>
                ) : (
                  items.map((cons) => (
                    <option key={cons.id} value={cons.id}>
                      {cons.nom}
                    </option>
                  ))
                )
              }
            </select>
            
            <input
              type="number"
              name="quantiteUtilise"
              placeholder="Quantité"
              value={form.quantiteUtilise}
              onChange={handleChange}
              className="w-full text-xl pl-6 py-3 border-l-5 border-fuchsia bg-white appearance-none rounded-sm p-2 shadow-[0_0_8px_2px_rgba(0,0,0,0.1)] dark:bg-gray-600
                dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia cursor-pointer"
              required
            />

            <textarea
              type="description"
              name="description"
              placeholder="description"
              value={form.description}
              onChange={handleChange}
              className="w-full text-xl pl-6 py-3 border-l-5 border-fuchsia bg-white appearance-none rounded-sm p-2 shadow-[0_0_8px_2px_rgba(0,0,0,0.1)] dark:bg-gray-600
                dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia cursor-pointer"
            />

            <div className="flex flex-row justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="gap-2 px-4 py-2 border border-transparent text-lg font-semibold rounded-lg text-white
                  bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150 shadow-md"
              >
                {t("cancel")}
              </button>
              <button 
                type="submit"
                className="text-white font-bold border border-transparent rounded-lg px-4 py-2 bg-fuchsia hover:bg-red-500 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition duration-150 shadow-md cursor-pointer"
              >
                {t("send")}
              </button>
            </div>
        
        </form>
      </div>
    </div>
  )
}