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

@Component({})
export default class TodoMVVM extends Vue {
  @Provide() private newTodo: string = ''
  @Provide() private todos: string[] = []

  private addTodo() {
    const value = this.newTodo && this.newTodo.trim()
    if (!value) {
      return
    }
    this.todos.push(value)
    this.newTodo = ''
  }
}
</script>

