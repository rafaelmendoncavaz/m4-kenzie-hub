import { Header } from "../../components/header/Header";
import { AddNewTech } from "../../components/modal/add-new-tech/AddNewTech";
import { EditTech } from "../../components/modal/edit-tech/EditTech";
import { TechList } from "../../components/technologies/tech-list/TechList";
import { Welcome } from "../../components/welcome/Welcome";
import { useModal } from "../../context/context";


export function Home() {

  const { isAddTechModalOpen, isEditTechModalOpen } = useModal((store) => store)


  return (
    <div className="my-0 mx-auto">
      <Header />
      <Welcome />
      <TechList />
      {
        isAddTechModalOpen && <AddNewTech />
      }
      {
        isEditTechModalOpen && <EditTech />
      }

    </div>
  )
}