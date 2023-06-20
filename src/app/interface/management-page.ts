import { iCours_ClearNum } from "./courses";


export interface iSoringCycle_management {
    name: string;
    status: number;
    isExpand: boolean;
}

export interface iExpandOptions {
    option: string;
    message: string;
}

export interface iNavPattern_page {
    expandOptions: iExpandOptions[];
    cycles: iSoringCycle_management[];
}

export interface iCycle {
    name: string;
    status: number;
    courses: string[];
}

export interface iGender {
    title: string;
    courses: iCours_ClearNum[]
}


export interface iCreateNew {
    title: string;
    HTMLelement: string,
    inputPlaceholder?: string,
    formControlName: string,
    show?: boolean

}

// export interface iGender extends iGender_courses {
//     title: string;
//     courses: iCours_ClearNum[]
// }