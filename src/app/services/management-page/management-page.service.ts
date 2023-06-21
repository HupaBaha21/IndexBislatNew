import { Injectable } from '@angular/core';
import { RequestsService } from 'src/app/api-connection/requests/requests.service';
import { ExportExcelService } from '../export-excel/export-excel.service';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ManagementPageService {

  // answer$ = new BehaviorSubject<string>('');
  deleteAnswer$ = new BehaviorSubject<iAnswer>({});
  putAnswer$ = new BehaviorSubject<iAnswer>({});
  updateTo2$ = new BehaviorSubject<iAnswer>({});
  updateTo3$ = new BehaviorSubject<iAnswer>({});


  constructor(private apiConnection: RequestsService, private exportExcel: ExportExcelService) { }


  fileDownload(cycleName: string) {
    this.exportExcel.exportAsExcelFile(this.createCycleInterface_excel(cycleName + ''), cycleName + '');
  }

  createCycleInterface_excel(cycleName: string): any[] {
    let cycle = this.apiConnection.GetRequest('Choise/sort?sort=' + cycleName);

    let cycleInterface = [];
    for (let i = 0; i < cycle.length; i++) {

      cycleInterface.push({
        name: cycle[i].fullName,
        ID: cycle[i].id,
        sortNumber: cycle[i].sortFrame,
        sector: cycle[i].gender,
        first: cycle[i].first,
        firstReason: cycle[i].resonef,
        second: cycle[i].second,
        secondReason: cycle[i].resones,
        third: cycle[i].third,
        thirdReason: cycle[i].resonet
      })
    }
    return cycleInterface;
  }

  // deleteCycle(cycleName: string): Observable<iAnswer> {

  //   this.apiConnection.DeleteRequest('Sort/' + cycleName).subscribe(
  //     res => { this.deleteAnswer$.next({ isSuccess: true }); },
  //     err => { this.deleteAnswer$.next({ isSuccess: false, message: err.message }); }
  //   );
  //   return this.deleteAnswer$;
  // }

  // updateCycleStatus(cycleName: string, updatedStatus: number): Observable<iAnswer> {

  //   let originalCycle: { courses: string[], name: string, status: number } = this.apiConnection.GetRequest('Sort/' + cycleName);
  //   originalCycle.status = updatedStatus;
  //   originalCycle.courses = this.listOfCourseNumber(originalCycle.courses);
  //   console.log(originalCycle);

  //   this.apiConnection.PutRequest('Sort/UpdateSort', originalCycle).subscribe(
  //     res => {
  //       if (updatedStatus === 3) { this.updateTo3$.next({ isSuccess: true }); }
  //       if (updatedStatus === 2) { this.updateTo2$.next({ isSuccess: true }); }
  //       // this.putAnswer$.next({ isSuccess: true }); 
  //     },
  //     err => { this.putAnswer$.next({ isSuccess: false, message: err.message }); }
  //   );
  //   return this.putAnswer$;
  // }

  // sendToArchives(cycleName: string): Observable<iAnswer> {

  //   let originalCycle: { courses: string[], name: string, status: number } = this.apiConnection.GetRequest('Sort/' + cycleName);
  //   originalCycle.status = 3;
  //   originalCycle.courses = this.listOfCourseNumber(originalCycle.courses);
  //   console.log(originalCycle);

  //   this.apiConnection.PutRequest('Sort/UpdateSort', originalCycle).subscribe(
  //     res => { this.updateTo3$.next({ isSuccess: true }); },
  //     err => { this.updateTo3$.next({ isSuccess: false, message: err.message }); }
  //   );
  //   return this.putAnswer$;
  // }

  // ------------------------------------------------------------
  // listOfCourseNumber(courses: any) {
  //   let listCourseNumber: string[] = [];

  //   for (let i = 0; i < courses.length; i++) {
  //     listCourseNumber.push(courses[i].courseNumber);
  //   }
  //   return listCourseNumber;
  // }

}


interface iAnswer {
  isSuccess?: boolean;
  message?: string;
}