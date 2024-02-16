import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
    this.centerCurvedText()
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
    }, 10)

  }
}
