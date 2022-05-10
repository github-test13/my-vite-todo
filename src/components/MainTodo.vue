<script setup>
import { ref } from 'vue';
const todoRef = ref('');

// ローカルストレージにtodoListRefが存在すればparseし、
// 存在しなければundefinedになるため、空配列をセットする
const todoListRef = ref([]);
const todoList = localStorage.todoList;
todoListRef.value = todoList ? JSON.parse(todoList) : [];

// 編集ボタンを押下したときにtrueにする
const isEditRef = ref(false);
let editId = -1;

// 追加ボタン
const addTodo = () => {
  // ミリ秒
  const id = new Date().getTime();
  // 入力されたTODOを配列に格納
  todoListRef.value.push({ id: id, task: todoRef.value });
  // ローカルストレージに格納
  localStorage.todoList = JSON.stringify(todoListRef.value);
  // 格納後は入力欄を空にする
  todoRef.value = '';
};

// 変更ボタン
const editTodo = () => {
  // 編集対象のTODOを取得する
  const todo = todoListRef.value.find((todo) => todo.id === editId);
  // TODOリストから編集対象のインデックスを取得
  const idx = todoListRef.value.findIndex((todo) => todo.id === editId);
  // taskを編集後のTODOで置き換える
  todo.task = todoRef.value;
  // splice関数でインデックスを元に対象オブジェクトを置き換える
  todoListRef.value.splice(idx, 1, todo);
  // ローカルストレージに格納
  localStorage.todoList = JSON.stringify(todoListRef.value);
  isEditRef.value = false;
  editId = -1;
  // 格納後は入力欄を空にする
  todoRef.value = '';
};

// 編集ボタン
const showTodo = (id) => {
  // 配列（todoListRef.value）から引数のidと同じ要素を検索する。
  // findの「(todo)」には配列の要素が引数として順番に入る。
  // 「todo.id === id」がtrueなら、その時点の要素（todo）が返る。
  const todo = todoListRef.value.find((todo) => todo.id === id);
  // 取得した要素からtaskを取り出す
  todoRef.value = todo.task;
  isEditRef.value = true;
  editId = id;
};

// 削除ボタン
const deleteTodo = (id) => {
  const todo = todoListRef.value.find((todo) => todo.id === id);
  const idx = todoListRef.value.findIndex((todo) => todo.id === id);

  const delMsg = '「' + todo.task + '」を削除しますか？';
  if (!confirm(delMsg)) return;

  todoListRef.value.splice(idx, 1);
  localStorage.todoList = JSON.stringify(todoListRef.value);
};
</script>

<template>
  <div class="box_input">
    <input
      type="text"
      class="todo_input"
      v-model="todoRef"
      placeholder=" ＋ TODOを入力"
    />
    <button class="btn green" @click="editTodo" v-if="isEditRef">変更</button>
    <button class="btn" @click="addTodo" v-else>追加</button>
  </div>

  <div class="box_list">
    <div class="todo_list" v-for="todo in todoListRef" :key="todo.id">
      <div class="todo">
        <label><input type="checkbox" class="check" />{{ todo.task }}</label>
      </div>
      <div class="btns">
        <button class="btn green" @click="showTodo(todo.id)">編</button>
        <button class="btn pink" @click="deleteTodo(todo.id)">削</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box_input {
  margin-top: 20px;
}

.todo_input {
  width: 300px;
  margin-right: 8px;
  padding: 8px;
  font-size: 18px;
  border: 1px solid #aaa;
  border-radius: 6px;
}

.btn {
  padding: 8px;
  background-color: #03a9f4;
  border-radius: 6px;
  color: #fff;
  text-align: center;
  font-size: 14px;
}

.box_list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.todo_list {
  display: flex;
  align-items: center;
  gap: 8px;
}

.todo {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 12px;
  width: 300px;
}

.check {
  border: 1px solid red;
  transform: scale(1.6);
  margin: 0 16px 2px 6px;
}

.btns {
  display: flex;
  gap: 4px;
}

.green {
  background-color: #00c853;
}

.pink {
  background-color: #ff4081;
}
</style>
