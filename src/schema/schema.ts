/* eslint-disable no-useless-escape */
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string()
    .nonempty("Preencha o seu nome!")
    .min(3, "O mínimo são 3 letras!")
    .transform(name => {
      return name.trim().split(" ").map(word => {
        return word[0].toUpperCase().concat(word.substring(1))
      }).join(" ")
    }),
  email: z.string()
    .nonempty("Email obrigatório!")
    .toLowerCase(),
  password: z.string()
    .nonempty("Senha obrigatória!")
    .min(8, "Senha deve conter entre 8 a 20 caracteres")
    .max(20, "Senha muito longa!")
    .refine(password => /[A-Z]/.test(password), "A senha deve conter ao menos uma letra maiúscula")
    .refine(password => /[a-z]/.test(password), "A senha deve conter ao menos uma letra minúscula")
    .refine(password => /\d/.test(password), "A senha deve conter ao menos um número")
    .refine(password => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password), "A senha deve conter ao menos um caractere especial"),
  confirmPassword: z.string()
    .nonempty("Confirmação de senha obrigatória!")
    .min(8, "Senha deve conter entre 8 a 20 caracteres")
    .max(20, "Senha muito longa!")
    .refine(password => /[A-Z]/.test(password), "A senha deve conter ao menos uma letra maiúscula")
    .refine(password => /[a-z]/.test(password), "A senha deve conter ao menos uma letra minúscula")
    .refine(password => /\d/.test(password), "A senha deve conter ao menos um número")
    .refine(password => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password), "A senha deve conter ao menos um caractere especial"),
  bio: z.string()
    .nonempty("Preencha este campo!")
    .max(100, "Se descreva em no máximo 100 caracteres"),
  contact: z.string()
    .nonempty("Ex: LinkedIn, GitHub, Telefone, Redes Sociais, etc"),
  course_module: z.enum(["Primeiro módulo (Introdução ao Frontend)", "Segundo módulo (Frontend Avançado)", "Terceiro módulo (Introdução ao Backend)", "Quarto módulo (Backend Avançado)"], {
    message: "Selecione um módulo!"
  })
}).superRefine(({ password, confirmPassword }, context) => {
  if (confirmPassword !== password) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "As senhas não combinam",
      path: ["confirmPassword"],
    })
  }
})

export type createUserData = z.infer<typeof createUserSchema>

export type createUser = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  bio: string;
  contact: string;
  course_module: "Primeiro módulo (Introdução ao Frontend)" | "Segundo módulo (Frontend Avançado)" | "Terceiro módulo (Introdução ao Backend)" | "Quarto módulo (Backend Avançado)";
}

export type ToastMessage = (message: string) => void

export type LoginData = {
  email: string,
  password: string,
}

export type TechData = {
  title: string,
  status: string,
}

export type Techs = {
  id: string,
  title: string,
  status: string,
}

export type Works = {
  id?: string | undefined,
  title: string,
  description: string,
  deploy_url: string,
}

export type User = {
  name: string,
  email: string,
  course_module: string,
  id: string,
  bio: string,
  contact: string,
  techs: Techs[],
}

export type EditUser = {
  name: string,
  contact: string,
  old_password: string,
  password: string
}

export interface Modal {
  isAddTechModalOpen: boolean,
  isEditTechModalOpen: boolean,
  isEditUserModalOpen: boolean,
  isAddWorkModalOpen: boolean,
  isEditWorkModalOpen: boolean,
  openAddTechModal: () => void,
  openEditTechModal: () => void,
  openEditUserModal: () => void,
  openAddWorkModal: () => void,
  openEditWorkModal: () => void,
  closeModal: () => void
}

export interface APIStore {
  onSuccess: boolean,
  onFailure: boolean,
  onTechListSuccess: boolean,
  onWorkListSuccess: boolean,
  user: User | null,
  setUser: (userData: User | null) => void,
  createUser: (data: createUser) => Promise<void>,
  editUser: (userData: EditUser) => Promise<void>,
  userLogin: (data: LoginData) => Promise<void>,
  userLogout: (callback: () => void) => void,
  addNewTech: (data: Techs) => Promise<void>,
  getTechs: () => Promise<void>,
  techList: Techs[],
  deleteTech: (techId: string) => Promise<void>,
  techToEdit: Techs | null,
  setTechToEdit: (techs: Techs) => void,
  editTech: (techId: Techs["id"] | undefined, tech: TechData) => Promise<void>,
  workList: Works[],
  addNewWork: (data: Works) => Promise<void>,
  getWorks: () => Promise<void>,
  deleteWork: (workId: string | undefined) => Promise<void>,
  workToEdit: Works | null,
  setWorkToEdit: (works: Works) => void,
  editWork: (workId: Works["id"] | undefined, work: Works) => Promise<void>,
}