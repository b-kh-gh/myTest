import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnChanges {

  @Input() rating = 0;
  starWidth = 0;
  @Output() ratingClicked:EventEmitter<string>=new EventEmitter<string>();

  ngOnChanges():void{
    this.starWidth=this.rating*75/5;
    console.log(this.starWidth);
  }
// onClick(): void {
  //   this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
  // }
}
