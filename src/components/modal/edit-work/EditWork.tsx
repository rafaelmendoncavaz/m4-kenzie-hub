import { useForm } from "react-hook-form";
import { Form } from "../../global/Form";
import { ForwardedInput as Input } from "../../global/Input";
import { InputContainer } from "../../global/InputContainer";
import { Modal } from "../../global/Modal";
import { toastError, toastSuccess, useAPIStore, useModal } from "../../../context/context";
import type { Works } from "../../../schema/schema";

export function EditWork() {

  const { register, handleSubmit } = useForm<Works>()
  const { closeModal } = useModal((store) => store)
  const { workToEdit, editWork } = useAPIStore((store) => store)

  async function onSubmit(work: Works) {
    const id = workToEdit?.id
    await editWork(id, work)

    const { onWorkListSuccess } = useAPIStore.getState()
    if (onWorkListSuccess) {
      toastSuccess(`O Trabalho ${workToEdit?.title} foi atualizado com sucesso!`)
      closeModal()
    }
    if (!onWorkListSuccess) {
      toastError(`Erro ao atualizar o trabalho ${workToEdit?.title}`)
    }
  }

  return (
    <Modal
      title="Detalhes do Trabalho">
      <Form
        onSubmitFn={handleSubmit(onSubmit)}
        buttonText="Salvar Alterações">
        <InputContainer
          label="Nome do Trabalho"
          htmlFor="title" >
          <Input
            {...register("title")}
            type="text"
            defaultValue={workToEdit?.title}
          />
        </InputContainer>

        <InputContainer
          label="Descrição do Trabalho"
          htmlFor="description" >
          <Input
            {...register("description")}
            type="text"
            defaultValue={workToEdit?.description}
          />
        </InputContainer>

        <InputContainer
          label="Link do Trabalho"
          htmlFor="deploy_url" >
          <Input
            {...register("deploy_url")}
            type="text"
            defaultValue={workToEdit?.deploy_url}
          />
        </InputContainer>

      </Form>
    </Modal>
  )
}