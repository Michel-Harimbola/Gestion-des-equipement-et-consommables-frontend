import Main from "../../../ui/Main";
import Content from "../../../ui/Content";
import Profile from "../../../components/admin/Profile/Profile";
import Stats from "../../../components/admin/Stats/Stats";
import DemandeEmprunt from "../../../components/admin/DemandeEmprunt/DemandeEmprunt";
import Team from "../../../components/admin/Team/Team";


function AdminDashboard({ darkMode }) {
  return (
    <Main>
        <Content>
            <Stats darkMode={darkMode}/>
            <div className="flex flex-col gap-3 lg:flex-row">
                <DemandeEmprunt />
                <Team />
            </div>
        </Content>
        <Profile darkMode={darkMode}/>
    </Main>
  )
}

export default AdminDashboard;