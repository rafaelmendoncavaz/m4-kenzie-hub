import { create } from "zustand"
import { type APIStore, type createUser, type EditUser, type LoginData, type Modal, type TechData, type Techs, type ToastMessage, type User, type Works } from "../schema/schema"
import { app } from "../services/app"
import { Bounce, toast } from "react-toastify"

export const toastSuccess: ToastMessage = (message) => {

  toast.success(`${message}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  })
}

export const toastError: ToastMessage = (message) => {

  toast.error(`${message}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  })
}

export const useModal = create<Modal>((set) => ({
  isAddTechModalOpen: false,
  isEditTechModalOpen: false,
  isEditUserModalOpen: false,
  isAddWorkModalOpen: false,
  isEditWorkModalOpen: false,
  openAddTechModal: () => {
    set({ isAddTechModalOpen: true })
  },
  openEditTechModal: () => {
    set({ isEditTechModalOpen: true })
  },
  openEditUserModal: () => {
    set({ isEditUserModalOpen: true })
  },
  openAddWorkModal: () => {
    set({ isAddWorkModalOpen: true })
  },
  openEditWorkModal: () => {
    set({ isEditWorkModalOpen: true })
  },
  closeModal: () => {
    set({ isAddTechModalOpen: false })
    set({ isEditTechModalOpen: false })
    set({ isEditUserModalOpen: false })
    set({ isAddWorkModalOpen: false })
    set({ isEditWorkModalOpen: false })
  }
}))

export const useAPIStore = create<APIStore>((set) => ({
  onSuccess: false,
  onFailure: false,
  onTechListSuccess: true,
  onWorkListSuccess: true,
  user: null,
  setUser: (userData: User | null) => {
    set({ user: userData })
  },
  createUser: async (data: createUser) => {
    try {
      set({ onSuccess: false, onFailure: false })

      const user = { ...data }
      await app.post("/users", user)
      set({ onSuccess: true })

    } catch (error) {
      set({ onFailure: true })
      console.error("Error creating user", error)
    }
  },
  userLogin: async (data: LoginData) => {
    try {
      set({ onSuccess: false, onFailure: false })

      const getUser = await app.post("/sessions", data)
      localStorage.setItem("@KHUB_USER", JSON.stringify(getUser.data.user))
      localStorage.setItem("@KHUB_TOKEN", getUser.data.token)

      set({ onSuccess: true, user: getUser.data.user })
      toastSuccess("Login efetuado com sucesso!")

    } catch (error) {
      set({ onFailure: true })
      console.error("Error logging in", error)
      toastError("Falha ao fazer login. Verifique seu email e senha.")
    }
  },
  userLogout: (callback) => {
    localStorage.removeItem("@KHUB_USER")
    localStorage.removeItem("@KHUB_TOKEN")
    set({ user: null })
    if (callback) callback()
    toastSuccess("Logout de KenzieHub efetuado com sucesso!")
  },
  editUser: async (userData: EditUser) => {
    try {
      set({ onSuccess: false, onFailure: false })
      const token = localStorage.getItem("@KHUB_TOKEN")
      await app.put("/profile", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      const { data } = await app.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      set({ onSuccess: true, user: data })
      toastSuccess("Perfil atualizado com sucesso!")
    } catch (error) {
      console.error("Error editing user", error)
      set({ onFailure: true })
      toastError("Falha ao atualizar o seu perfil. Tente novamente!")
    }
  },
  techList: [],
  getTechs: async () => {
    try {
      set({ onSuccess: false, onFailure: false })
      const token = localStorage.getItem("@KHUB_TOKEN")
      const { data } = await app.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      set({ techList: data.techs })

    } catch (error) {
      set({ onFailure: true })
      console.error("Error getting techs", error)
    }
  },
  addNewTech: async (data: Techs) => {
    try {
      set({ onTechListSuccess: false })
      const token = localStorage.getItem("@KHUB_TOKEN")
      await app.post("/users/techs", data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      set((state) => ({
        onTechListSuccess: true,
        techList: [...state.techList, data]
      }))
      toastSuccess("Tecnologia adicionada com sucesso!")
    } catch (error) {
      set({ onTechListSuccess: false })
      console.error("Error adding new tech", error)
      toastError("Ops! Algo deu errado, tente novamente!")
    }
  },
  deleteTech: async (techId: string) => {
    try {
      set({ onTechListSuccess: false })
      const token = localStorage.getItem("@KHUB_TOKEN")
      await app.delete(`/users/techs/${techId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      set({ onTechListSuccess: true })
      toastSuccess("Tecnologia deletada com sucesso!")

    } catch (error) {
      set({ onTechListSuccess: false })
      toastError("Erro ao deletar a tecnologia!")
      console.error("Error deleting tech", error)
    }
  },
  techToEdit: null,
  setTechToEdit: (tech: Techs) => {
    set({ techToEdit: tech })
  },
  editTech: async (techId: Techs["id"] | undefined, tech: TechData) => {
    try {
      set({ onTechListSuccess: false })
      const token = localStorage.getItem("@KHUB_TOKEN")
      const techStatus = {
        status: tech.status
      }
      await app.put(`/users/techs/${techId}`, techStatus,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      set({ onTechListSuccess: true })

    } catch (error) {
      set({ onTechListSuccess: false })
      console.error("Error editing tech", error)
    }
  },
  workList: [],
  getWorks: async () => {
    try {
      set({ onSuccess: false, onFailure: false })
      const token = localStorage.getItem("@KHUB_TOKEN")
      const { data } = await app.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      set({ workList: data.works })

    } catch (error) {
      set({ onFailure: true })
      console.error("Error getting techs", error)
    }
  },
  addNewWork: async (data: Works) => {
    try {
      set({ onWorkListSuccess: false })
      const token = localStorage.getItem("@KHUB_TOKEN")
      await app.post("/users/works", data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      set((state) => ({
        onWorkListSuccess: true,
        workList: [...state.workList, data]
      }))
      toastSuccess("Trabalho adicionado com sucesso!")
    } catch (error) {
      set({ onWorkListSuccess: false })
      console.error("Error adding new work", error)
      toastError("Ops! Algo deu errado, tente novamente!")
    }
  },
  deleteWork: async (workId: Works["id"]) => {
    try {
      set({ onWorkListSuccess: false })
      const token = localStorage.getItem("@KHUB_TOKEN")
      await app.delete(`/users/works/${workId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      set({ onWorkListSuccess: true })
      toastSuccess("Trabalho deletado com sucesso!")

    } catch (error) {
      set({ onWorkListSuccess: false })
      toastError("Erro ao deletar o Trabalho!")
      console.error("Error deleting work", error)
    }
  },
  workToEdit: null,
  setWorkToEdit: (work: Works) => {
    set({ workToEdit: work })
  },
  editWork: async (workId: Works["id"] | undefined, work: Works) => {
    try {
      set({ onWorkListSuccess: false })
      const token = localStorage.getItem("@KHUB_TOKEN")

      await app.put(`/users/works/${workId}`, work,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      set({ onWorkListSuccess: true })

    } catch (error) {
      set({ onWorkListSuccess: false })
      console.error("Error editing work", error)
    }
  },
}))