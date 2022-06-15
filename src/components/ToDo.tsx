import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Categories, IToDo, toDoSelector, toDoState } from '../atoms';

function ToDo({text, category, id}: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const selectorOutput = useRecoilValue(toDoSelector);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {currentTarget: {name}} = event;
    setToDos(oldToDos => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
      if (name === Categories.DELETE) {
        return [ // 기본 자바스크립트 slice 활용하여 값 업데이트 시키기
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1)
        ];
      }
      const newToDo = {text, id, category: name as Categories};
      return [ // 기본 자바스크립트 slice 활용하여 값 업데이트 시키기
      ...oldToDos.slice(0, targetIndex),
      newToDo,
      ...oldToDos.slice(targetIndex + 1),
      ];
    });
  }

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button name={Categories.DELETE} onClick={onClick}>
        Delete
      </button>
    </li>
  );
}

export default ToDo;