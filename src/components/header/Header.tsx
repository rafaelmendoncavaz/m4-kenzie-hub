import { useNavigate } from "react-router-dom";
import { Button } from "../global/Button";
import logo from "../../assets/Logo.png"
import { useAPIStore } from "../../context/context";

export function Header() {

  const navigate = useNavigate()
  const { userLogout } = useAPIStore.getState()

  return (
    <header className="border-b border-b-zinc-600">
      <div className="w-full max-w-5xl my-0 mx-auto flex items-center justify-between px-5 py-10">
        <div>
          <img
            src={logo}
            alt="Kenzie Hub"
          />
        </div>
        <Button
          onClick={() => userLogout(() => navigate("/"))}
          type="button"
          colorVariants="tertiary"
          sizeVariants="small">
          Sair
        </Button>

      </div>
    </header>
  )
}