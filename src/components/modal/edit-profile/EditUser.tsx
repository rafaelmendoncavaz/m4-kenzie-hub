import { useForm } from "react-hook-form";
import { Form } from "../../global/Form";
import { ForwardedInput as Input } from "../../global/Input";
import { InputContainer } from "../../global/InputContainer";
import { Modal } from "../../global/Modal";
import { useAPIStore, useModal } from "../../../context/context";
import type { EditUser } from "../../../schema/schema";

export function EditUser() {

  const { register, handleSubmit } = useForm<EditUser>()
  const { closeModal } = useModal((store) => store)
  const { user, editUser } = useAPIStore((store) => store)

  async function onSubmit(userData: EditUser) {
    await editUser(userData)
    const { onSuccess } = useAPIStore.getState()
    if (onSuccess) {
      closeModal()
    }
  }

  return (
    <Modal
      title="Atualizar Perfil">
      <Form
        onSubmitFn={handleSubmit(onSubmit)}
        buttonText="Salvar Alterações">
        <InputContainer
          label="Nome"
          htmlFor="name" >
          <Input
            {...register("name")}
            type="text"
            defaultValue={user?.name}
          />
        </InputContainer>

        <InputContainer
          label="Contato"
          htmlFor="contact" >
          <Input
            {...register("contact")}
            type="text"
            defaultValue={user?.contact}
          />
        </InputContainer>

        <InputContainer
          label="Senha antiga"
          htmlFor="old_password" >
          <Input
            {...register("old_password")}
            type="password"
            placeholder="Digite sua senha antiga"
          />
        </InputContainer>

        <InputContainer
          label="Senha nova"
          htmlFor="password" >
          <Input
            {...register("password")}
            type="password"
            placeholder="Digite sua nova senha"
          />
        </InputContainer>

      </Form>
    </Modal>
  )
}