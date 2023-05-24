import { Title } from "@angular/platform-browser";
import { iCours_short, iCours_ClearNum, iCours_forCycles } from "./courses";

export interface iSortCycle {
    name: string;
    status: number;
    courses: iCours_ClearNum[];
}

export interface iSortCycle_short {
    name: string;
    status: number;
}

// presented on page
export interface iSortingCycle_page {
    name: string;
    genders: Array<{
        title: string,
        courses: iCours_forCycles[]
    }>;
}
