import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { ForwardedInput as Input } from "../../components/global/Input";
import logo from "../../assets/Logo.png"
import { InputContainer } from "../../components/global/InputContainer";
import { Form } from "../../components/global/Form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/global/Button";
import { toastError, toastSuccess, useAPIStore } from "../../context/context";
import { createUserSchema, type createUserData } from "../../schema/schema";

export function SignUp() {

  const navigate = useNavigate()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<createUserData>({
    resolver: zodResolver(createUserSchema)
  })

  async function onSubmit(data: createUserData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = data
    const { createUser } = useAPIStore.getState()
    await createUser(rest)

    const { onSuccess, onFailure } = useAPIStore.getState()

    if (onSuccess) {
      toastSuccess("Cadastro efetuado com sucesso! Você será redirecionado")
      setTimeout(() => {
        navigate("/")
      }, 3000)
      reset()
    }
    if (onFailure) {
      toastError("Ops! Algo deu errado. Tente novamente!")
    }
  }

  return (
    <div className="my-5 mx-auto w-96 h-full flex flex-col items-center place-content-center">
      <div className="w-full mb-10 flex items-center justify-between px-5">
        <div>
          <img
            src={logo}
            alt="Kenzie Hub"
          />
        </div>
        <Button
          onClick={() => navigate("/")}
          type="button"
          colorVariants="tertiary"
          sizeVariants="small">
          Voltar
        </Button>

      </div>

      <div className="flex flex-col items-center space-y-6 bg-zinc-800 rounded px-5 py-10 shadow-shape overflow-y-auto">

        <Form
          onSubmitFn={handleSubmit(onSubmit)}
          buttonText="Cadastrar">
          <div className="flex flex-col items-center justify-between gap-6">
            <h1 className="text-lg font-bold">
              Crie sua conta
            </h1>
            <span className="text-xs text-zinc-400">
              Rápido e grátis, vamos nessa
            </span>
          </div>

          <InputContainer label="Nome" htmlFor="name" >
            <Input
              {...register("name")}
              type="text"
              placeholder="Digite aqui o seu nome"
            />
            {errors.name && <span className="text-xs text-red-600">{errors.name.message}</span>}
          </InputContainer>

          <InputContainer label="Email" htmlFor="email" >
            <Input
              {...register("email")}
              type="email"
              placeholder="Digite aqui o seu e-mail"
            />
            {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
          </InputContainer>

          <InputContainer label="Senha" htmlFor="password" >
            <Input
              {...register("password")}
              type="password"
              placeholder="Digite aqui a sua senha"
            />
            {errors.password && <span className="text-xs text-red-600">{errors.password.message}</span>}
          </InputContainer>

          <InputContainer label="Confirmar Senha" htmlFor="confirmPassword" >
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="Digite novamente a sua senha"
            />
            {errors.confirmPassword && <span className="text-xs text-red-600">{errors.confirmPassword.message}</span>}
          </InputContainer>

          <InputContainer label="Bio" htmlFor="bio" >
            <Input
              {...register("bio")}
              type="text"
              placeholder="Fale sobre você"
            />
            {errors.bio && <span className="text-xs text-red-600">{errors.bio.message}</span>}
          </InputContainer>

          <InputContainer label="Contato" htmlFor="contact" >
            <Input
              {...register("contact")}
              type="text"
              placeholder="Opção de contato"
            />
            {errors.contact && <span className="text-xs text-red-600">{errors.contact.message}</span>}
          </InputContainer>

          <div className="flex flex-col gap-1">
            <label
              className="text-sm"
              htmlFor="module">
              Selecionar módulo
            </label>
            <select
              className="border border-zinc-700 bg-zinc-700 rounded px-4 h-12 w-80 focus:border-zinc-200 outline-none shadow-shape"
              defaultValue={""}
              {...register("course_module")}>
              <option value="" disabled>Selecione um módulo</option>
              <option value="Primeiro módulo (Introdução ao Frontend)">Primeiro Módulo</option>
              <option value="Segundo módulo (Frontend Avançado)">Segundo Módulo</option>
              <option value="Terceiro módulo (Introdução ao Backend)">Terceiro Módulo</option>
              <option value="Quarto módulo (Backend Avançado)">Quarto Módulo</option>
            </select>
            {errors.course_module && <span className="text-xs text-red-600">{errors.course_module.message}</span>}
          </div>
        </Form>
      </div>

    </div>
  )
}