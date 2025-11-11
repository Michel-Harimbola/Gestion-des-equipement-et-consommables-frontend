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

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({
        ...form,
        [name]: name === "equipementId" ? parseInt(value, 10) : value,
      });
    };

    // Charger les équipements et initialiser le form
    useEffect(() => {
      const initForm = async () => {
        const res = await dispatch(fetchEquipements()).unwrap();
        // Si aucun ID pré-sélectionné ou ID non dispo, choisir le premier dispo
        const premierDispo = preselectedId && res.find(eq => eq.id === preselectedId && eq.etat === "Disponible")
          ? preselectedId
          : res.find(eq => eq.etat === "Disponible")?.id || "";
        setForm((prev) => ({ ...prev, equipementId: premierDispo }));
      };
      initForm();
    }, [dispatch, preselectedId]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createDemandeEmprunt(form)).unwrap();

      // Recharger les équipements pour obtenir les mises à jour
      const res = await dispatch(fetchEquipements()).unwrap();

      // Réinitialiser le formulaire avec le premier équipement dispo
      const premierDispo = res.find(eq => eq.etat === "Disponible")?.id || "";
      setForm({ dateRetourPrevu: "", equipementId: premierDispo });
    } catch (err) {
      console.error(err);
    }
  };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     await dispatch(createDemandeEmprunt(form)).unwrap();

    //     dispatch(fetchEquipements());
    //     setForm({ dateRetourPrevu: "", equipementId: "" });
    // };

    // useEffect(() => {
    //   dispatch(fetchEquipements());
    // }, [dispatch]);

    // Liste des équipements disponibles pour le select
    const equipementsDisponibles = items.filter((eq) => eq.etat === "Disponible");

    return (
      <div className="mt-24 ml-4 mr-6">
          <h1 className="text-4xl -ml-1 font-bold lg:flex text-center">Soumettre le formulaire de demande d'emprunt</h1>

          <div className="grid justify-center place-items-center h-full w-full mt-42">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-14">
                  <div className="space-y-4">
                      <h1 className="text-2xl font-semibold">Sélectionner un élément d'équipement</h1>
                      <select   
                          value={form.equipementId}
                          onChange={handleChange}  
                          name="equipementId"
                          className="w-full text-xl pl-6 py-3 border-l-5 border-blue-700 rounded-sm appearance-none bg-white shadow-[0_0_8px_2px_rgba(0,0,0,0.1)]
                              focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 cursor-pointer"
                      required
                      >
                          {equipementsDisponibles.length === 0 ? (
                              <option value="">Aucun équipement disponible</option>
                            ) : (
                              equipementsDisponibles.map((eq) => (
                                <option key={eq.id} value={eq.id}>
                                  {eq.nom}
                                </option>
                              ))
                            )}
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
                        required
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