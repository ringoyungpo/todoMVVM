import { Provide } from 'vue-property-decorator'

export default class Todo {
  @Provide() private title: string
  @Provide() private completed: boolean
  constructor(title: string) {
    this.title = title
    this.completed = false
  }
}
