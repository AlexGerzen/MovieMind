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

  saveDataToLocalStorage(endScore: number) {
    try {
      const jsonData = JSON.stringify(endScore); // Convert data to JSON format
      localStorage.setItem(this.localStorageKey, jsonData); // Save data to Local Storage under the specified key
      console.log('Data saved to local storage successfully.');
    } catch (error) {
      console.error('Error saving data to local storage:', error);
    }
  }

  checkForNewHighScore() {
    console.log(this.endScore);

    if (this.endScore > this.personalHighScore) {
      this.saveDataToLocalStorage(this.endScore);
    }
  }
}
