import { iExpandOptions } from "../interface/management-page";

//nav bar
export const navOptions: Array<{ text: string, url: string }> = [
    {
        text: 'מחזורי מיון',
        url: 'sorts'
    }, {
        text: 'ארכיון',
        url: 'archives'
    }, {
        text: 'עריכת קורסים',
        url: 'courses'
    }
];


//sorts options
export const expandOptions_sorts: iExpandOptions[] =
    [{
        option: 'הורדת דו"ח העדפות',
        message: ''
    }, {
        option: 'עריכת המחזור',
        message: 'האם אתה בטוח שברצונך לערוך מחזור מיון זה?'
    }, {
        option: 'העבר לארכיון',
        message: 'האם אתה בטוח שברצונך להעביר מחזור מיון זה לארכיון?'
    }, {
        option: 'מחיקה',
        message: 'האם אתה בטוח שברצונך למחוק מחזור מיון זה?'
    },
    ];


//archives options
export const expandOptions_archives: iExpandOptions[] =
    [{
        option: 'הורדת דו"ח העדפות',
        message: ''
    }, {
        option: 'הוצא מארכיון',
        message: 'האם אתה בטוח שברצונך להוציא מחזור מיון זה מהארכיון?'
    }, {
        option: 'מחיקה',
        message: 'האם אתה בטוח שברצונך למחוק מחזור מיון זה?'
    },
    ];

//create new cycle
export const createNewCycle = [
    {
        title: "שם מחזור המיון",
        HTMLelement: "input",
        inputPlaceholder: "לדוגמא: דצמבר 2022",
        formControlName: "name"
    },
    {
        title: "הוספת קורסים",
        HTMLelement: "search",
        inputPlaceholder: "הקלד מספר/ שם מקצוע",
        formControlName: "genderInput"
    },
    {
        title: "הצגת מחזור המיון באתר",
        HTMLelement: "checkbox",
        show: true,
        formControlName: "showSortOnWeb"
    },
    {
        title: "פתיחת שאלון העדפות",
        HTMLelement: "checkbox",
        show: false,
        formControlName: "openSelectionForm"
    }
]
