<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo"
             autofocus
             autocomplete="off"
             placeholder="What needs to be done?"
             v-model="newTodo"
             @keyup.enter="addTodo">
    </header>
    <p>{{newTodo}}</p>
    <p>{{todos}}</p>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Written by <a href="http://ringoyungpo.github.io">Ringo Yungpo Kao</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  </section>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

const STORAGE_KEY = 'todos-vuejs-3.0'

class TodoStorage {
  static fetch(): string[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  }
  static save(todos: string[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

@Component({})
export default class TodoMVVM extends Vue {
  @Provide() private newTodo: string = ''
  @Provide() private todos: string[] = TodoStorage.fetch()

  private addTodo() {
    const value = this.newTodo && this.newTodo.trim()
    if (!value) {
      return
    }
    this.todos.push(value)
    this.newTodo = ''
    TodoStorage.save(this.todos)
  }
}
</script>

