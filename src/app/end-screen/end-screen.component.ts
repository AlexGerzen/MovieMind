import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.scss']
})
export class EndScreenComponent {
  @Input() endScore: number = 0;
  @Output() showQuiz: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  /**
   * This function is used to to trigger the "showQuiz" function in the parent component 
   */
  triggerShowQuiz() {
    this.showQuiz.emit();
  }
}
