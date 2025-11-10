import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom";
import { createDemandeEmprunt } from "../../redux/slices/user/demandeEmpruntSlice";
import { fetchEquipements } from "../../redux/slices/user/equipementSlice";

export default function Emprunter() {
    const location = useLocation();
    const preselectedId = location.state?.equipementId || "";

    const [form, setForm] = useState({dateRetourPrevu: "", equipementId: preselectedId});
    const dispatch = useDispatch();
    const { items } = useSelector((state => state.equipement));

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createDemandeEmprunt(form)).unwrap();
    };

    useEffect(() => {
      dispatch(fetchEquipements());
    }, [dispatch]);

    return (
      <div className="mt-24 ml-4 mr-6">
          <h1 className="text-4xl -ml-1 font-bold">Soumettre le formulaire de demande d'emprunt</h1>

          <div className="grid justify-center place-items-center h-full w-full mt-42">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-14">
                  <div className="space-y-4">
                      <h1 className="text-2xl font-semibold">Sélectionner un élément d'équipement</h1>
                      <select   
                          value={form.equipementId}
                          onChange={handleChange}  
                          name="equipementId"
                          className="w-full text-xl pl-6 py-3 border-l-5 border-blue-700 rounded-sm appearance-none bg-white shadow-[0_0_8px_2px_rgba(0,0,0,0.1)]
                              focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 cursor-pointer">
                          {items
                            .filter((eq) => eq.etat === "Disponible")
                            .map((eq) => (
                            <option key={eq.id} value={form.equipementId = eq.id}>
                                {eq.nom}
                            </option>
                          ))}
                      </select>
                  </div>
                  <div className="space-y-4">
                      <h1 className="text-2xl font-semibold">Date de retour prévu</h1>
                      <input
                        name="dateRetourPrevu"
                        value={form.dateRetourPrevu}
                        onChange={handleChange}
                        type="date"
                        className="w-full text-xl pl-6 py-3 border-l-5 border-blue-700 bg-white appearance-none rounded-sm p-2 shadow-[0_0_8px_2px_rgba(0,0,0,0.1)]
                        focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      />
                  </div>
                  <div className="flex justify-center">
                      <button 
                          type="submit"
                          className="text-white font-bold border border-transparent rounded-3xl px-4 py-2 bg-blue-600 hover:bg-blue-700 
                              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 shadow-md cursor-pointer"
                      >
                          Envoyer la demande
                      </button>
                  </div>
              </form>
          </div>
      </div>
    )
}