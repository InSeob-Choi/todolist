import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from '../atoms';

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const localToDos = localStorage.getItem("toDos");
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({toDo}: IForm) => {
    setToDos(oldToDos => [{text: toDo, id: Date.now(), category}, ...oldToDos]); // 함수로 사용할 경우, 아규먼트는 기존 값임. 여기서 리코일 값을 변경함.
    setValue("toDo", "");
  };
  useEffect(() => { // localStorage
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos])
  // useEffect(() => {
  //   setToDos(JSON.parse(localToDos as string))
  // }, [])

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input {...register("toDo", {
        required: "할 일을 쓰세요."
      })} placeholder="Write a to do" />
      <button>Add</button>
    </form>
  )
}

export default CreateToDo;