import { Header } from "../../components/header/Header";
import { AddNewTech } from "../../components/modal/add-new-tech/AddNewTech";
import { AddNewWork } from "../../components/modal/add-new-work/AddNewWork";
import { EditUser } from "../../components/modal/edit-profile/EditUser";
import { EditTech } from "../../components/modal/edit-tech/EditTech";
import { EditWork } from "../../components/modal/edit-work/EditWork";
import { TechList } from "../../components/technologies/tech-list/TechList";
import { Welcome } from "../../components/welcome/Welcome";
import { WorkList } from "../../components/work-list/WorkList";
import { useModal } from "../../context/context";


export function Home() {

  const { isAddTechModalOpen, isEditTechModalOpen, isEditUserModalOpen, isAddWorkModalOpen, isEditWorkModalOpen } = useModal((store) => store)


  return (
    <div className="my-0 mx-auto">
      <Header />
      <Welcome />
      <TechList />
      <WorkList />
      {
        isAddTechModalOpen && <AddNewTech />
      }
      {
        isEditTechModalOpen && <EditTech />
      }
      {
        isEditUserModalOpen && <EditUser />
      }
      {
        isAddWorkModalOpen && <AddNewWork />
      }
      {
        isEditWorkModalOpen && <EditWork />
      }
    </div>
  )
}