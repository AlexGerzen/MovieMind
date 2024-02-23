import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MovieMind';
  showStartScreenStatus: boolean = false; // Standard: true
  showQuizStatus: boolean = false; // Standard: false
  showEndScreenStatus: boolean = true; // Standard: false
  endScore: number = 0;

  /**
   * This function is used to show the quiz component
   */
  showQuiz() {
    this.resetAll();
    this.showQuizStatus = true;
  }

  /**
   * This function will show the endscreen, and write the end score to the variable "endScore"
   * 
   * @param score This is the endScore, which is given from the quiz component
   */
  showEndScreen(score: number) {
    this.resetAll();
    this.endScore = score;
    this.showEndScreenStatus = true;
  }

  /**
   * This function is used to hide all components
   */
  resetAll() {
    this.showQuizStatus = false;
    this.showStartScreenStatus = false;
    this.showEndScreenStatus = false;
  }
}
