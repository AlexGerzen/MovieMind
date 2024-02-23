import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Movie } from 'src/models/movie.class';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {
  urlBase: string = 'http://www.omdbapi.com/?t='
  apiKey: string = '&apikey=dd98c964';
  movie: Movie = new Movie();
  movieList: string[] = [];
  blurValue: number = 10;
  showIcon: boolean = true;
  playerAnswer: string = '';
  currentProgress: number = 1; // Standard: 1
  showReleaseYear: boolean = false;
  showActors: boolean = false;
  showTitle: boolean = false;
  showSpinner: boolean = false; //Standard: false
  shakeInputStatus: boolean = false;
  lowerRoundPointsAnimation: boolean = false;
  filteredMovies: string[] = [];
  totalPoints: number = 0;
  roundPoints: number = 100;
  showNext: boolean = false;
  enoughPoints: boolean = true;
  subtractedPoints: number = 0;
  @Output() showEndScreen: EventEmitter<any> = new EventEmitter();
  @Output() updateEndScore: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.subMovieList()
  }

  /**
   * This function will create the url for the movie data
   * 
   * @returns Url to the movie data will be returned
   */
  createUrl() {
    return this.urlBase + this.movieList[this.getRandomArrayNumber()] + this.apiKey;
  }

  /**
   * This function is used to subscribe the json where all the movie names are listed
   */
  subMovieList() {
    this.http.get<string[]>('/assets/movieNames.json').subscribe({
      next: (data: string[]) => {
        this.movieList = data;
        this.fetchMovie(this.createUrl());
      },
      error: (error) => {
        console.error('Fehler beim Laden der Daten:', error);
      }
    });
  }

  /**
   * This function is used to fetch the data for the current movie and bind it to variable "movie"
   * 
   * @param url This is the url for the current movie data
   */
  async fetchMovie(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Fehler beim Abrufen der Daten');
      }
      const movieData = await response.json();
      this.movie = new Movie(movieData);
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
      throw error;
    }
  }


  /**
   * This function is used to get a random number depending on the length of the array
   * 
   * @returns It return a random number depending in the length of the array
   */
  getRandomArrayNumber(): number {
    if (this.movieList.length > 0) {
      return Math.floor(Math.random() * this.movieList.length);
    } else {
      console.error("Ungültiges Array oder leeres Array übergeben.");
      return -1;
    }
  }

  /**
   * This function is used to lower the blur effect of the poster
   */
  lowerBlurEffect() {
    this.blurValue = this.blurValue - 6;
    this.showIcon = false;
  }

  /**
   * This function will check if the answer of the player is correct. If it is correct, the movie will be revealed and the win screen appears. If it is wrong it will lower the round points
   */
  checkPlayerAnswer() {
    if (this.movie.title == this.playerAnswer) {
      this.revealMovie(false);
      //Win screen
    } else {
      this.lowerRoundPoints(10);
      this.shakeInput();
    }
  }


  /**
   * This function is used to filter the movie list after the input of the player
   */
  filterMovieList() {
    if (this.playerAnswer.length >= 3) {
      this.filteredMovies = this.movieList.filter(item => item.toLowerCase().includes(this.playerAnswer.toLowerCase()));
    } else {
      this.filteredMovies = []
    }
  }

  /**
   * This function is used to clear the blur effect and show the title of the movie
   * 
   * @param playerGiveUp This variable will tell if the player gave up or the quiz is finished
   */
  revealMovie(playerGiveUp: boolean) {
    this.blurValue = 0;
    this.showTitle = true;
    this.showNext = true;
    this.showActors = true;
    this.showReleaseYear = true;
    this.showIcon = false;
    if (playerGiveUp) {
      this.lowerRoundPoints(this.roundPoints);
    }

  }

  /**
   * This function is used to lower the round points
   * 
   * @param amount This is the amount of points that get subtracted
   */
  lowerRoundPoints(amount: number) {
    this.roundPoints = this.roundPoints - amount;
    this.triggerLowerRoundPointsAnimation(amount);
    if (this.roundPoints <= 0) {
      this.roundPoints = 0;
      this.revealMovie(false);
    }
  }

  triggerLowerRoundPointsAnimation(amount: number) {
    this.lowerRoundPointsAnimation = true;
    this.subtractedPoints = amount;

    setTimeout(() => {
      this.lowerRoundPointsAnimation = false;
    }, 500);
  }

  /**
   * This function is used to show the next movie question, if all questions are answered, it will show the endscreen
   */
  nextMovie() {
    this.totalPoints = this.totalPoints + this.roundPoints;
    if (this.currentProgress >= 10) {
      this.triggerShowEndScreen();
    } else {
      this.hideAllHints();
      this.loadNewMovie();
      this.currentProgress++;
      this.roundPoints = 100;
      this.playerAnswer = '';
    }

  }

  /**
   * This function is used to show a progress spinner while loading the next movie
   */
  loadNewMovie() {
    this.showSpinner = true;

    this.fetchMovie(this.createUrl()).then(() => {
      this.showSpinner = false;
    });
  }

  /**
   * This function is used to hide all hints
   */
  hideAllHints() {
    this.showTitle = false;
    this.showNext = false;
    this.showActors = false;
    this.showReleaseYear = false;
    this.showIcon = true;
    this.blurValue = 10;
  }

  /**
   * This function is used to to trigger the "showEndScreen" function in the parent component 
   */
  triggerShowEndScreen() {
    this.showEndScreen.emit(this.totalPoints);
  }

  /**
   * This function is used to shake the input field
   */
  shakeInput() {
    this.shakeInputStatus = true;

    setTimeout(() => {
      this.shakeInputStatus = false;
    }, 500);
  }
}
