import { useForm } from "react-hook-form";
import { Form } from "../../global/Form";
import { ForwardedInput as Input } from "../../global/Input";
import { InputContainer } from "../../global/InputContainer";
import { Modal } from "../../global/Modal";
import { useAPIStore, useModal } from "../../../context/context";
import type { Techs } from "../../../schema/schema";

export function AddNewTech() {

  const { register, handleSubmit } = useForm<Techs>()
  const { closeModal } = useModal((store) => store)

  async function onSubmit(data: Techs) {
    const { addNewTech } = useAPIStore.getState()
    await addNewTech(data)

    const { onTechListSuccess } = useAPIStore.getState()
    if (onTechListSuccess) {
      closeModal()
    }
  }

  return (
    <Modal
      title="Cadastrar Tecnologia">
      <Form
        onSubmitFn={handleSubmit(onSubmit)}
        buttonText="Cadastrar Tecnologia">
        <InputContainer
          label="Nome da tecnologia"
          htmlFor="title" >
          <Input
            {...register("title")}
            type="text"
            placeholder="Digite aqui o nome da tecnologia"
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
            defaultValue={""}>
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