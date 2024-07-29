import { create } from "zustand"
import { user, type APIStore, type createUser, type LoginData, type Modal, type TechData, type Techs, type ToastMessage } from "../schema/schema"
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
  openAddTechModal: () => {
    set({ isAddTechModalOpen: true })
  },
  openEditTechModal: () => {
    set({ isEditTechModalOpen: true })
  },
  closeModal: () => {
    set({ isAddTechModalOpen: false })
    set({ isEditTechModalOpen: false })
  }
}))

export const useAPIStore = create<APIStore>((set) => ({
  onSuccess: false,
  onFailure: false,
  onTechListSuccess: false,
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

      set({ onSuccess: true })

    } catch (error) {
      set({ onFailure: true })
      console.error("Error logging in", error)
    }
  },
  userLogout: (callback) => {
    localStorage.removeItem("@KHUB_USER")
    localStorage.removeItem("@KHUB_TOKEN")
    if (callback) callback()
    toastSuccess("Logout de KenzieHub efetuado com sucesso!")
  },
  techList: [],
  getTechs: async () => {
    try {
      set({ onSuccess: false, onFailure: false })
      const id = user?.id
      const { data } = await app.get(`/users/${id}`)
      set({ onTechListSuccess: true, techList: data.techs })

    } catch (error) {
      set({ onFailure: true })
      console.error("Error getting techs", error)
    } finally {
      set({ onTechListSuccess: false })
    }
  },
  addNewTech: async (data: Techs) => {
    try {
      set({ onSuccess: false, onFailure: false })
      const token = localStorage.getItem("@KHUB_TOKEN")
      await app.post("/users/techs", data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      set((state) => ({
        onTechListSuccess: true,
        techList: [...state.techList, data]
      }))
    } catch (error) {
      set({ onFailure: true })
      console.error("Error adding new tech", error)
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

    } catch (error) {
      set({ onTechListSuccess: false })
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
  }
}))

