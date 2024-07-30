import { useForm } from "react-hook-form";
import { ForwardedInput as Input } from "../../components/global/Input";
import logo from "../../assets/Logo.png"
import { InputContainer } from "../../components/global/InputContainer";
import { Form } from "../../components/global/Form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/global/Button";
import { useAPIStore } from "../../context/context";
import { type LoginData } from "../../schema/schema";
import { useEffect } from "react";
import { app } from "../../services/app";

export function SignIn() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<LoginData>()
  const { userLogin, setUser } = useAPIStore((store) => store)

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("@KHUB_TOKEN")

      if (!token) {
        return
      }
      try {
        const { data } = await app.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        setUser(data)
        navigate("/dashboard")
      } catch (error) {
        console.error("Error loading user", error)
        localStorage.removeItem("@KHUB_TOKEN")
        localStorage.removeItem("@KHUB_USER")
      }
    }
    loadUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function onSubmit(data: LoginData) {

    await userLogin(data)

    const { onSuccess, user } = useAPIStore.getState()
    if (onSuccess) {
      if (user) {
        navigate("/dashboard")
      }
    }
  }

  return (
    <div className="my-0 mx-auto w-96 h-full flex flex-col items-center place-content-center">
      <div className="mb-10">
        <img src={logo} alt="Kenzie Hub" />
      </div>

      <div className="flex flex-col items-center space-y-6 bg-zinc-800 rounded px-5 py-10 shadow-shape">
        <Form
          onSubmitFn={handleSubmit(onSubmit)}
          buttonText="Entrar">

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