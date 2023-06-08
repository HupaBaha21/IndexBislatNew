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