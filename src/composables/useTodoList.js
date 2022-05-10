import { ref } from 'vue';

export const useTodoList = () => {
  // ローカルストレージにtodoListRefが存在すればparseし、
  // 存在しなければundefinedになるため、空配列をセットする
  const todoListRef = ref([]);
  const todoList = localStorage.todoList;
  todoListRef.value = todoList ? JSON.parse(todoList) : [];

  // TODOリストからidを元にTODO情報を取得
  const findById = (id) => {
    return todoListRef.value.find((todo) => todo.id === id);
  };

  // TODOリストからidを元にTODO情報のインデックスを取得
  const findIndexById = (id) => {
    return todoListRef.value.findIndex((todo) => todo.id === id);
  };

  // 追加ボタン処理
  const add = (task) => {
    const id = new Date().getTime();
    todoListRef.value.push({ id: id, task: task, checked: false });
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  // 変更ボタン処理
  const edit = (task) => {
    const todo = findById(editId.value);
    const idx = findIndexById(editId.value);
    todo.task = task;
    todoListRef.value.splice(idx, 1, todo);
    localStorage.todoList = JSON.stringify(todoListRef.value);
    editId.value = -1;
  };

  // 編集ボタン処理
  const editId = ref(-1);
  const show = (id) => {
    const todo = findById(id);
    editId.value = id;
    return todo.task;
  };

  // 削除ボタン処理
  const del = (id) => {
    const todo = findById(id);

    const delMsg = '「' + todo.task + '」を削除しますか？';
    if (!confirm(delMsg)) return;

    const idx = findIndexById(id);
    todoListRef.value.splice(idx, 1);
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  // チェックボックス処理
  const check = (id) => {
    const todo = findById(id);
    const idx = findIndexById(id);
    todo.checked = !todo.checked;
    todoListRef.value.splice(idx, 1, todo);
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  return { todoListRef, add, edit, show, del, check };
};
