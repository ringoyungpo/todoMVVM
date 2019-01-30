import { Provide } from 'vue-property-decorator'

export default class Todo {
  @Provide() public title: string
  @Provide() public completed: boolean
  constructor(title: string) {
    this.title = title
    this.completed = false
  }
}
