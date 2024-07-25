import { useForm } from "react-hook-form";
import { Input } from "../../components/global/Input";
import logo from "../../assets/Logo.png"
import { InputContainer } from "../../components/global/InputContainer";
import { Form } from "../../components/global/Form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/global/Button";

export function SignUp() {
  const navigate = useNavigate()

  const { register } = useForm()

  return (
    <div className="w-96 max-h-full flex flex-col items-center">
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

      <div className="flex flex-col items-center space-y-6 bg-zinc-800 rounded px-5 py-10 shadow-shape">

        <Form buttonText="Cadastrar" >
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
          </InputContainer>

          <InputContainer label="Email" htmlFor="email" >
            <Input
              {...register("email")}
              type="email"
              placeholder="Digite aqui o seu e-mail"
            />
          </InputContainer>

          <InputContainer label="Senha" htmlFor="password" >
            <Input
              {...register("password")}
              type="password"
              placeholder="Digite aqui a sua senha"
            />
          </InputContainer>

          <InputContainer label="Confirmar Senha" htmlFor="confirmPassword" >
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="Digite novamente a sua senha"
            />
          </InputContainer>

          <InputContainer label="Bio" htmlFor="bio" >
            <Input
              {...register("bio")}
              type="text"
              placeholder="Fale sobre você"
            />
          </InputContainer>

          <InputContainer label="Contato" htmlFor="contact" >
            <Input
              {...register("contact")}
              type="text"
              placeholder="Opção de contato"
            />
          </InputContainer>
          <div className="flex flex-col gap-1">
            <label
              className="text-sm"
              htmlFor="module">
              Selecionar módulo
            </label>
            <select
              className="border border-zinc-700 bg-zinc-700 rounded px-4 h-12 w-80 focus:border-zinc-200 outline-none shadow-shape"
              {...register("module")}>
              <option value="">Selecione um módulo</option>
              <option value="Primeiro módulo (Introdução ao Frontend)">Primeiro Módulo</option>
              <option value="Segundo módulo (Frontend Avançado)">Segundo Módulo</option>
              <option value="Terceiro módulo (Introdução ao Backend)">Terceiro Módulo</option>
              <option value="Quarto módulo (Backend Avançado)">Quarto Módulo</option>
            </select>
          </div>
        </Form>
      </div>
    </div>
  )
}