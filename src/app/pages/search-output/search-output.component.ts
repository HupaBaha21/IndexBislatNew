import { Component, ElementRef, Renderer2, OnInit, ViewChild } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { UrlTree } from '@angular/router';
import { RequestsService } from 'src/app/api-connection/requests/requests.service';
import { TransformResService } from 'src/app/services/transform-res/transform-res.service';
import { allBases, basesGroups } from 'src/app/template/bases';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-search-output',
  templateUrl: './search-output.component.html',
  styleUrls: ['./search-output.component.scss']
})
export class SearchOutputComponent implements OnInit {

  @Input() courseNumber: string | undefined;
  @Output() selectedPage = new EventEmitter<string>();

  course: any; // ליצור INTERFACE של קורס
  isFavorite: string = '';
  changeMap: boolean = false;


  alertText: string = 'נוסף למועדפים בהצלחה'
  // tof: boolean[] = [];

  @ViewChild(MatSidenav) snav!: MatSidenav;


  mapp: Document | undefined;
  @ViewChild("mapObject") set mapObject(o: ElementRef) {
    this.renderer.listen(o.nativeElement, "load", () => {
      this.mapp = o.nativeElement.contentDocument;
      this.removeBases();
    });
  };

  constructor(private apiRequest: RequestsService, private transformValue: TransformResService, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.course = this.apiRequest.GetRequest('Course/' + this.courseNumber);
    this.course.courseNumber = this.transformValue.clearNumber('' + this.courseNumber);
    this.isFavorite = this.favoritePosition();
    setTimeout(() => { this.changeMap = !this.course.courseBases.includes('כל בסיסי חיל האוויר'); }, 3500);

  }

  pageNavigate(page: string) {
    this.selectedPage.emit(page);
  }

  removeOrAddToFavorite(favorite: boolean) {
    let favoritesCourses: any[] = JSON.parse(localStorage.getItem('my-favorites') || '[]');

    // remove from favorites
    if (favorite === true) {
      this.isFavorite = 'notFavorite.svg';
      let index = favoritesCourses.find(item => item.courseName === this.course.courseName);
      favoritesCourses.splice(index, 1);
    }
    // add to favorites
    else if (favorite === false) {
      this.isFavorite = 'favorite.svg';
      favoritesCourses.push({
        courseNumber: this.course.courseNumber,
        courseUnclearNumber: this.courseNumber,
        courseName: this.course.courseName,
        courseTime: this.course.courseTime
      });
      localStorage.setItem('my-favorites', JSON.stringify(favoritesCourses));
    }
  }

  favoritePosition(): string {
    // console.log(this.snav);
    // this.snav.opened = true;
    const favorites: any[] = JSON.parse(localStorage.getItem('my-favorites') || '[]');
    let tmp = favorites.find(course => course.courseName === this.course.courseName)

    if (tmp) { return 'favorite.svg'; }
    return 'notFavorite.svg';
  }

  removeBases() {
    const basesToRemove: string[] = this.listToRemove();

    for (let i = 0; i < basesToRemove.length; i++) {
      this.renderer.setStyle(this.mapp?.getElementById(basesToRemove[i]), "display", "none");
    }
  }




  // ----------------------------------------------------------------------------------------------
  listToRemove(): string[] {

    let basesToRemove = allBases;

    for (let i = 0; i < this.course.courseBases.length; i++) {
      let tmp = this.course.courseBases[i].replace(" ", "_").replace("''", "_");
      let index = basesToRemove.indexOf(tmp);

      if (index === -1) {
        let group = basesGroups.find(item => item.title === tmp) || { title: '', bases: [] };

        for (let y = 0; y < group.bases.length; y++) {
          let index = basesToRemove.indexOf(group.bases[y]);
          if (index != -1) { basesToRemove.splice(index, 1); }
        }
      }
      else {
        basesToRemove.splice(index, 1);
      }
    }
    return basesToRemove;
  }
}
