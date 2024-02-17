import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MovieMind';
  showStartScreenStatus: boolean = true;
  showQuizStatus: boolean = false;

  /**
   * This function is used to show the quiz component
   */
  public showQuiz() {
    this.resetAll();
    this.showQuizStatus = true;
  }

  /**
   * This function is used to hide all components
   */
  resetAll() {
    this.showQuizStatus = false;
    this.showStartScreenStatus = false;
  }
}
