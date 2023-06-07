import { FormGroup } from "@angular/forms";

export interface iPage {
    formGroup?: FormGroup;
    buttonText: string;
    items: selection[];
}

interface selection {
    title: string;
    HTMLelement: string;
    inputPlaceholder: string;
    formControlName: string;
    selectionsOptions?: option[];
    selectOptions?: any[];
}

export interface option {
    text: string;
    expansion: boolean;
    causeNum: number;
}

export interface iSelectionForm {
    title: string
    gender: string
    id: string
    fullName: string
    sortFrame: number
    first: string
    resonef: string
    second: string
    resones: string
    third: string
    resonet: string
}


export const ipreference_page: iPage[] = [
    {
        buttonText: "המשך",
        items: [
            {
                title: "מחזור המיון",
                HTMLelement: "select",
                inputPlaceholder: "",
                selectOptions: [],
                formControlName: "cycleInput"
            },
            {
                title: "מגזר",
                HTMLelement: "select",
                inputPlaceholder: "",
                selectOptions: ['אלקטרוניקה', 'אחזקה מתכת/ חשמל'],
                formControlName: "genderInput"
            },
            {
                title: "שם פרטי + שם משפחה",
                HTMLelement: "input",
                inputPlaceholder: "",
                formControlName: "nameInput"
            },
            {
                title: "מספר תעודת זהות",
                HTMLelement: "input",
                inputPlaceholder: "",
                formControlName: "idInput"
            },
            {
                title: "מסגרת מיון",
                HTMLelement: "input",
                inputPlaceholder: "הערך חייב להיות מספר",
                formControlName: "sortNumberInput"
            }
        ]
    },
    {
        buttonText: "שלח",
        items: [
            {
                title: "העדפה ראשונה",
                HTMLelement: "select",
                inputPlaceholder: "",
                selectOptions: [],
                formControlName: "firstOption"
            },
            {
                title: "סיבה להעדפה ראשונה",
                HTMLelement: "checkbox",
                inputPlaceholder: "",
                selectionsOptions: [
                    {
                        text: 'מוטיבציה לתפקיד',
                        expansion: false,
                        causeNum: 0
                    },
                    {
                        text: 'קרבה למקום מגורים',
                        expansion: false,
                        causeNum: 0
                    },
                    {
                        text: 'חברים (יש לציין שמות)',
                        expansion: true,
                        causeNum: 0
                    },
                    {
                        text: 'אחר',
                        expansion: true,
                        causeNum: 0
                    }],
                formControlName: "firstCauses"

            },
            {
                title: "העדפה שנייה",
                HTMLelement: "select",
                inputPlaceholder: "",
                selectOptions: [],
                formControlName: "secondOption"
            },
            {
                title: "סיבה להעדפה שנייה",
                HTMLelement: "checkbox",
                inputPlaceholder: "",
                selectionsOptions: [
                    {
                        text: 'מוטיבציה לתפקיד',
                        expansion: false,
                        causeNum: 1
                    },
                    {
                        text: 'קרבה למקום מגורים',
                        expansion: false,
                        causeNum: 1
                    },
                    {
                        text: 'חברים (יש לציין שמות)',
                        expansion: true,
                        causeNum: 1
                    },
                    {
                        text: 'אחר',
                        expansion: true,
                        causeNum: 1
                    }],
                formControlName: "secondCauses"

            },
            {
                title: "העדפה שלישית",
                HTMLelement: "select",
                inputPlaceholder: "",
                selectOptions: [],
                formControlName: "thirdOption"
            },
            {
                title: "סיבה להעדפה שלישית",
                HTMLelement: "checkbox",
                inputPlaceholder: "",
                selectionsOptions: [
                    {
                        // name: '',
                        text: 'מוטיבציה לתפקיד',
                        expansion: false,
                        causeNum: 2
                    },
                    {
                        // name: '',
                        text: 'קרבה למקום מגורים',
                        expansion: false,
                        causeNum: 2
                    },
                    {
                        // name: '',
                        text: 'חברים (יש לציין שמות)',
                        expansion: true,
                        causeNum: 2
                    },
                    {
                        // name: '',
                        text: 'אחר',
                        expansion: true,
                        causeNum: 2
                    }],
                formControlName: "thirdCauses"
            }
        ]
    }
];
