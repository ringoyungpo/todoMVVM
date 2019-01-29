<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo"
             autofocus
             autocomplete="off"
             placeholder="What needs to be done?"
             v-model="newTodoTitle"
             @keyup.enter="addTodo">
    </header>
    <section class="main"
             v-show="todos.length"
             v-cloak>
      <ul class="todo-list">
        <li v-for="(todo, index) in todos"
            class="todo"
            :key="index">
          <div class="view">
            <input class="toggle"
                   type="checkbox"
                   v-model="todo.completed">
            <label @dblclick="editTodo(index)">{{ todo.title }}</label>
            <button class="destroy"
                    @click="removeTodo(index)"></button>
          </div>
          <input class="edit"
                 type="text"
                 v-model="todo.title"
                 v-todo-focus="index == editingIndex">
        </li>
      </ul>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Written by <a href="http://ringoyungpo.github.io">Ringo Yungpo Kao</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  </section>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import Todo from '../models/Todo'

const STORAGE_KEY = 'todos-vuejs-3.0'

@Component({
  directives: {
    'todo-focus'(el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
})
export default class TodoMVVM extends Vue {
  @Provide() private newTodoTitle: string = ''
  @Provide() private editingIndex: number | null = null
  @Provide() private todos: Todo[] = []

  private addTodo() {
    const value = this.newTodoTitle && this.newTodoTitle.trim()
    if (!value) {
      return
    }
    this.todos.push(new Todo(value))
    this.newTodoTitle = ''
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
  }

  private removeTodo(index: number) {
    this.todos.splice(index, 1)
  }

  private editTodo(index: number) {
    this.editingIndex = index
  }
}
</script>

