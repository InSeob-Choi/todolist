import { atom, selector } from 'recoil';

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
  "DELETE" = "DELETE"
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

let output = localStorage.getItem("toDos"); // localStorage
let localData = JSON.parse(output as any); // localStorage

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: localData || [] // localStorage
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO
})

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({get}) => { // get으로 atom의 output을 받아옴. (this.get의 의미임)
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter(toDo => toDo.category === category); // 아래 3개를 하나로 섹시하게 만듦.
    // if (category === "TO_DO") return toDos.filter(toDo => toDo.category === "TO_DO");
    // if (category === "DOING") return toDos.filter(toDo => toDo.category === "DOING");
    // if (category === "DONE") return toDos.filter(toDo => toDo.category === "DONE");
  }
});