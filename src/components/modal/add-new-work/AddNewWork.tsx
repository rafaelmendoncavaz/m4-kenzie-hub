import { useForm } from "react-hook-form";
import { Form } from "../../global/Form";
import { ForwardedInput as Input } from "../../global/Input";
import { InputContainer } from "../../global/InputContainer";
import { Modal } from "../../global/Modal";
import { useAPIStore, useModal } from "../../../context/context";
import type { Works } from "../../../schema/schema";

export function AddNewWork() {

  const { register, handleSubmit } = useForm<Works>()
  const { closeModal } = useModal((store) => store)
  const { addNewWork } = useAPIStore((store) => store)

  async function onSubmit(data: Works) {
    await addNewWork(data)

    const { onWorkListSuccess } = useAPIStore.getState()
    if (onWorkListSuccess) {
      closeModal()
    }
  }

  return (
    <Modal
      title="Cadastrar Trabalho">
      <Form
        onSubmitFn={handleSubmit(onSubmit)}
        buttonText="Cadastrar Trabalho">
        <InputContainer
          label="Nome do trabalho"
          htmlFor="title" >
          <Input
            {...register("title")}
            type="text"
            placeholder="Digite aqui o nome do trabalho"
          />
        </InputContainer>

        <InputContainer
          label="Descrição do trabalho"
          htmlFor="description" >
          <Input
            {...register("description")}
            type="text"
            placeholder="Descreva seu trabalho"
          />
        </InputContainer>

        <InputContainer
          label="Link do trabalho"
          htmlFor="deploy_url" >
          <Input
            {...register("deploy_url")}
            type="text"
            placeholder="Insira o link do trabalho"
          />
        </InputContainer>

      </Form>
    </Modal>
  )
}