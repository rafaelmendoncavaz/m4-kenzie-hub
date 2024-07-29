import { useForm } from "react-hook-form";
import { Form } from "../../global/Form";
import { ForwardedInput as Input } from "../../global/Input";
import { InputContainer } from "../../global/InputContainer";
import { Modal } from "../../global/Modal";
import { toastError, toastSuccess, useAPIStore, useModal } from "../../../context/context";
import type { TechData } from "../../../schema/schema";

export function EditTech() {

  const { register, handleSubmit } = useForm<TechData>()
  const { closeModal } = useModal((store) => store)
  const { techToEdit, editTech } = useAPIStore((store) => store)

  async function onSubmit(tech: TechData) {
    const id = techToEdit?.id
    await editTech(id, tech)

    const { onTechListSuccess } = useAPIStore.getState()
    if (onTechListSuccess) {
      toastSuccess(`Status de ${techToEdit?.title} atualizado com sucesso!`)
      closeModal()
    }
    if (!onTechListSuccess) {
      toastError(`Erro ao atualizar o status de ${techToEdit?.title}`)
    }
  }

  return (
    <Modal
      title="Detalhes da Tecnologia">
      <Form
        onSubmitFn={handleSubmit(onSubmit)}
        buttonText="Salvar Alterações">
        <InputContainer
          label="Nome da tecnologia"
          htmlFor="title" >
          <Input
            {...register("title")}
            type="text"
            value={techToEdit?.title}
            disabled
          />
        </InputContainer>

        <div className="flex flex-col gap-1">
          <label
            className="text-sm"
            htmlFor="status">
            Selecionar status
          </label>
          <select
            className="border border-zinc-700 bg-zinc-700 rounded px-4 h-12 w-80 focus:border-zinc-200 outline-none shadow-shape"
            {...register("status")}
            defaultValue={techToEdit?.status}>
            <option value="" disabled>Selecione um status</option>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
        </div>

      </Form>
    </Modal>
  )
}