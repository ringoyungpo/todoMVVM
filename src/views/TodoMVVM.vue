<template>
  <div>
    <main class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo"
               autofocus
               autocomplete="off"
               placeholder="What needs to be done?"
               v-model="newTodo.title"
               @keyup.enter="()=>{
                  newTodo.title = newTodo.title.trim()
                  if (!newTodo.title) {
                    return
                  }
                  todos.push(newTodo)
                  newTodo = new Todo('')
                }" />
      </header>
      <article class="main"
               v-show="todos.length"
               v-cloak>
        <input id="toggle-all"
               class="toggle-all"
               type="checkbox"
               v-model="allDone" />
        <label for="toggle-all">
          Mark all as complete
        </label>
        <ul class="todo-list">
          <li v-for="(todo, index) in  todos"
              class="todo"
              :key="index"
              :class="{ completed: todo.completed, editing: index === editingIndex }">
            <section class="view"
                     v-if="visibility?{
                    active: !todo.completed,
                    completed: todo.completed,
                    all: true
                  }[visibility]:true">
              <input class="toggle"
                     type="checkbox"
                     v-model="todo.completed" />
              <label @dblclick="()=>{
                editingIndex = index
                const {title, completed} = todo
                editingTodo = new Todo(title, completed)
              }">
                {{ todo.title }}
              </label>
              <button class="destroy"
                      @click="()=>todos.splice(index, 1)" />
            </section>
            <input class="edit"
                   type="text"
                   v-model="editingTodo.title"
                   v-todo-focus="index === editingIndex"
                   @blur="doneEdit(editingTodo, index)"
                   @keyup.enter="doneEdit(editingTodo, index)"
                   @keyup.esc="()=>{editingIndex = null}" />
          </li>
        </ul>
      </article>
      <footer class="footer"
              v-show="todos.length"
              v-cloak>
        <span class="todo-count">
          <strong>{{ activeTodos.length }}</strong> {{
          activeTodos.length === 1?'item': 'items' }} left
        </span>
        <ul class="filters">
          <li><a :href="$router.resolve({name: 'home', params: {visibility: 'all'}}).href"
               :class="{ selected: visibility === 'all' }">All</a></li>
          <li><a :href="$router.resolve({name: 'home', params: {visibility: 'active'}}).href"
               :class="{ selected: visibility === 'active' }">Active</a></li>
          <li><a :href="$router.resolve({name: 'home', params: {visibility: 'completed'}}).href"
               :class="{ selected: visibility === 'completed' }">Completed</a></li>
        </ul>
        <button class="clear-completed"
                @click="()=>{todos = activeTodos}"
                v-show="completedTodos.length>0">
          Clear completed
        </button>
      </footer>
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
  @Provide() private newTodo?: Todo = new Todo('')
  @Provide() private editingTodo?: Todo = new Todo('')
  @Provide() private editingIndex: number | null = null
  @Provide() private visibility?: string | null = null
  @Provide() private Todo: any = Todo
  @Provide() private todos: Todo[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '[]'
  )

  public get activeTodos(): Todo[] {
    return this.todos.filter(todo => !todo.completed)
  }

  public get completedTodos(): Todo[] {
    return this.todos.filter(todo => todo.completed)
  }

  public get allDone(): boolean {
    return this.activeTodos.length === 0
  }

  public set allDone(switcher: boolean) {
    this.todos = this.todos.map(todo => {
      return {
        ...todo,
        completed: switcher
      }
    })
  }

  @Watch('todos', { immediate: true, deep: true })
  private onTodosChanged(val: Todo[], oldVal: Todo[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
  }

  private doneEdit(editingTodo: Todo, index: number) {
    editingTodo.title = editingTodo.title.trim()
    if (!editingTodo.title) {
      this.todos.splice(index, 1)
    } else {
      this.todos.splice(index, 1, editingTodo)
    }
    this.editingIndex = null
  }

  private mounted() {
    this.visibility = this.$route.params.visibility
    if (
      this.visibility &&
      !['all', 'active', 'completed'].includes(this.visibility)
    ) {
      this.$router.push('/')
      window.console.log('jump')
    }
  }
}
</script>