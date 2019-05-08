<template>
  <div>
    <main class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo"
               autofocus
               autocomplete="off"
               placeholder="What needs to be done?"
               v-model="newTodoTitle"
               @keyup.enter="()=>{
                  const value = newTodoTitle && newTodoTitle.trim()
                  if (!value) {
                    return
                  }
                  todos.push(new Todo(value))
                  newTodoTitle = null
                }" />
      </header>
      <article v-show="todos.length"
               v-cloak>
        <ul class="todo-list">
          <li v-for="(todo, index) in todos"
              class="todo"
              :key="index"
              :class="{ completed: todo.completed, editing: index === editingIndex }">
            <section class="view">
              <input class="toggle"
                     type="checkbox"
                     v-model="todo.completed" />
              <label @dblclick="()=>{
                editingIndex = index
                const {title} = todo
                beforeEditCache = title
              }">
                {{ todo.title }}
              </label>
              <button class="destroy"
                      @click="()=>todos.splice(index, 1)" />
            </section>
            <input class="edit"
                   type="text"
                   v-model="todo.title"
                   v-todo-focus="index === editingIndex"
                   @blur="()=>editingIndex = null"
                   @keyup.enter="()=>editingIndex = null"
                   @keyup.esc="()=>{todo.title = beforeEditCache;editingIndex = null}" />
          </li>
        </ul>
      </article>
    </main>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Written by <a href="http://ringoyungpo.github.io">Ringo Yungpo Kao</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue, Watch } from 'vue-property-decorator'
import Todo from '../models/Todo'

const STORAGE_KEY = 'todos-vuejs-3.0'

@Component({
  directives: {
    'todo-focus'(el: HTMLElement, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
})
export default class TodoMVVM extends Vue {
  @Provide() private newTodoTitle: string | null = null
  @Provide() private beforeEditCache: string | null = null
  @Provide() private editingIndex: number | null = null
  @Provide() private Todo: any = Todo
  @Provide() private todos: Todo[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '[]'
  )

  @Watch('todos', { immediate: true, deep: true })
  private onTodosChanged(val: Todo[], oldVal: Todo[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
  }
}
</script>