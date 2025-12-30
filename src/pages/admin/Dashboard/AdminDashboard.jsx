import Main from "../../../ui/Main";
import Content from "../../../ui/Content";
import Profile from "../../../components/admin/Profile/Profile";
import Stats from "../../../components/admin/Stats/Stats";
import DemandeEmprunt from "../../../components/admin/DemandeEmprunt/DemandeEmprunt";
import RecentEmprunt from "../../../components/admin/RecentEmprunt/RecentEmprunt";


function AdminDashboard({ darkMode }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <Main>
          <Content>
              <Stats darkMode={darkMode}/>
              <div className="flex flex-col gap-3 lg:flex-row">
                  <DemandeEmprunt />
                  <RecentEmprunt />
              </div>
          </Content>
          <Profile darkMode={darkMode}/>
      </Main>
    </div>
  )
}

export default AdminDashboard;