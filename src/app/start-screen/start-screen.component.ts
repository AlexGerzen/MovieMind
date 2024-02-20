import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  mirrorSmileyStatus: boolean = false;
  mirrorSmileyStyle: { [key: string]: string } = { transform: 'scaleX(1)' };
  @Output() showQuiz: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  ngOnInit(): void {
    this.centerCurvedText();
    this.animateSmiley();
  }

  /**
   * This function is used to center the title of the loading screen while it is animating
   */
  centerCurvedText() {
    setInterval(() => {
      var curve = document.getElementById('curve');
      if (curve instanceof SVGPathElement) {
        var length = curve.getTotalLength();

        var text = document.querySelector('textPath')!;
        var textLength = text.getComputedTextLength();

        var midpoint = length / 2;

        var startOffset = midpoint - (textLength / 2);

        var textPath = document.querySelector('textPath');
        if (textPath instanceof SVGTextPathElement) {
          textPath.setAttribute('startOffset', String(startOffset));
        }
      }
    }, 30)
  }

  /**
   * This function is used to animate the smiley
   */
  animateSmiley() {
    setInterval(() => {
      if (this.mirrorSmileyStatus) {
        this.resetSmiley()
      } else {
        this.mirrorSmiley();
      }
      setTimeout(() => {

      }, 2000)
    }, 2000);
  }

  /**
   * This function is used to mirror the smiley
   */
  mirrorSmiley() {
    this.mirrorSmileyStatus = true;
    this.mirrorSmileyStyle = { transform: 'scaleX(1)' };
  }

  /**
   * This function is used reset the mirror of the smiley
   */
  resetSmiley() {
    this.mirrorSmileyStatus = false;
    this.mirrorSmileyStyle = { transform: 'scaleX(-1)' };
  }

  /**
   * This function is used to to trigger the "showQuiz" function in the parent component 
   */
  triggerShowQuiz() {
    this.showQuiz.emit();
  }
}
