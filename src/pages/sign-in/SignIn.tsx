import { useForm } from "react-hook-form";
import { Input } from "../../components/global/Input";
import logo from "../../assets/Logo.png"
import { InputContainer } from "../../components/global/InputContainer";
import { Form } from "../../components/global/Form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/global/Button";

export function SignIn() {
  const navigate = useNavigate()

  const { register } = useForm()

  return (
    <div className="w-96 max-h-full flex flex-col items-center">
      <div className="mb-10">
        <img src={logo} alt="Kenzie Hub" />
      </div>

      <div className="flex flex-col items-center space-y-6 bg-zinc-800 rounded px-5 py-10 shadow-shape">
        <Form buttonText="Entrar" >

          <h1 className="text-lg font-bold">
            Login
          </h1>

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
        </Form>

        <div className="w-full flex flex-col items-center gap-5">
          <span className="text-zinc-400 text-xs font-bold">
            Ainda não possui uma conta?
          </span>
          <Button
            onClick={() => navigate("/sign-up")}
            colorVariants="secondary" >
            Cadastre-se
          </Button>
        </div>
      </div>
    </div>
  )
}