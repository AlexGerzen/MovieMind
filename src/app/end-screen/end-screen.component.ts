import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.scss']
})
export class EndScreenComponent implements OnInit {
  @Input() endScore: number = 0;
  @Output() showQuiz: EventEmitter<any> = new EventEmitter();
  personalHighScore: number;
  localStorageKey: string = "highScore"

  constructor() {
    this.personalHighScore = this.getDataFromLocalStorage();

  }

  ngOnInit(): void {
    this.checkForNewHighScore();
  }

  /**
   * This function is used to to trigger the "showQuiz" function in the parent component 
   */
  triggerShowQuiz() {
    this.showQuiz.emit();
  }

  /**
   * This function is used to get the data from the local storage
   * 
   * @returns It returns the high score from the localstorage
   */
  getDataFromLocalStorage() {
    try {
      const data = localStorage.getItem(this.localStorageKey);
      if (data !== null) {
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      console.error('Error retrieving data from local storage:', error);
      return null;
    }
  }

  /**
   * This function is used to safe the endscore in the local storage
   * 
   * @param endScore This is the score that will be safed in the local storage
   */
  saveDataToLocalStorage(endScore: number) {
    try {
      const jsonData = JSON.stringify(endScore); // Convert data to JSON format
      localStorage.setItem(this.localStorageKey, jsonData); // Save data to Local Storage under the specified key
    } catch (error) {
      console.error('Error saving data to local storage:', error);
    }
  }

  /**
   * This function is used to check if the current end score is the new high score
   */
  checkForNewHighScore() {
    if (this.endScore > this.personalHighScore) {
      this.saveDataToLocalStorage(this.endScore);
    }
  }
}
