import { Component, OnInit } from '@angular/core';
import { interval, fromEvent } from 'rxjs';
import { imgUrls } from 'src/app/template/home-page-template';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  allImages: string[] = imgUrls; // כל התמונות
  // imagesBackground: string[] = []; // מערך תמונות שמוצגות באתר
  // backgroundImageIndex: number = 0; // מיקום במערך של תמונה ששונתה אחרונה
  // allImagesIndex: number = 0; // מיקום של תמונה אחרונה ששומשה באתר מכל התמונות

  imgURL1: string = "";
  imgURL2: string = "";
  imgURL3: string = "";
  imgCount: number = 1;
  index: number = 0;
  threeImagesPosition: boolean = false;
  slideShowInterval = interval(5000);
  clicks = fromEvent(window, 'resize');

  constructor() {

    if ((window.innerWidth / window.innerHeight) < 1) { this.threeImagesPosition = false; }
    else { this.threeImagesPosition = true; }

    this.restartImages();
    this.slideShowInterval.subscribe(() => this.setNextImage());
  }

  ngOnInit(): void {

    this.clicks.subscribe(() => {
      if (this.isScreenPositionChanged()) { this.restartImages(); }
    });
  }

  isScreenPositionChanged(): boolean {

    if ((window.innerWidth / window.innerHeight) > 1 && this.threeImagesPosition) { return false; }
    if ((window.innerWidth / window.innerHeight) < 1 && this.threeImagesPosition === false) { return false; }

    if (this.threeImagesPosition) { this.threeImagesPosition = false; }
    else { this.threeImagesPosition = true; }
    return true;
  }

  restartImages(): void {

    this.imgURL2 = "";
    this.imgURL3 = "";
    this.imgCount = 1;

    this.setFirstIamge();

    for (let i = 1; i < 3 && this.threeImagesPosition; i++) {
      this.setNextImage();
    }
  }


  setFirstIamge(): void {
    let random = Math.floor(Math.random() * (imgUrls.length - 1));
    this.imgURL1 = imgUrls[random];
    this.imgCount = 1;
    this.index = random;
  }

  setNextImage(): void {

    if (this.index === (imgUrls.length - 1)) { this.index = 0; }
    else { this.index++; }

    if (this.threeImagesPosition) {
      if (this.imgCount === 3) { this.imgCount = 1; }
      else { this.imgCount++; }
    }

    if (this.imgCount === 1) { this.imgURL1 = imgUrls[this.index]; }
    if (this.imgCount === 2) { this.imgURL2 = imgUrls[this.index]; }
    if (this.imgCount === 3) { this.imgURL3 = imgUrls[this.index]; }
  }


  // setNextImage(): void {

  //  this.imagesBackground[this.backgroundImageIndex] = this.allImages[this.allImagesIndex];

  //  if(this.allImagesIndex < this.allImages.length) { this.allImagesIndex++; }
  //  else { this.allImagesIndex = 0; }

  //  if(this.backgroundImageIndex < 2 && this.threeImagesPosition) { this.backgroundImageIndex++; }
  //  else if( this.threeImagesPosition) {}




  //   // console.log(this.images);




  //   if (this.index === (imgUrls.length - 1)) { this.index = 0; }
  //   else { this.index++; }

  //   if (this.threeImagesPosition) {
  //     if (this.imgCount === 3) { this.imgCount = 1; }
  //     else { this.imgCount++; }
  //   }

  //   if (this.imgCount === 1) { this.imgURL1 = imgUrls[this.index]; }
  //   if (this.imgCount === 2) { this.imgURL2 = imgUrls[this.index]; }
  //   if (this.imgCount === 3) { this.imgURL3 = imgUrls[this.index]; }
  // }




}
