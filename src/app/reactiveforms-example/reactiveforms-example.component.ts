import { Component, OnInit } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Examples } from './code-example';

@Component({
    selector: 'app-reactiveformscodeexample',
    templateUrl: './reactiveforms-example.component.html',
    styleUrls: ['./reactiveforms-example.component.scss']
})
export class ReactiveformsexampleComponent implements OnInit {
    userForm: FormGroup;
    validationMessages = {
        firstname: {
            'minlength': 'Namnet måste vara minst 2 tecken',
        },
        lastname: {
            'minlength': 'Namnet måste vara minst 2 tecken',
        },
        age: {
            'invalidNumber': 'Ange en siffra',
            'min': 'Ange en ålder på minst 18 år',
            'max': 'Ange en ålder under 120',
        },
        email: {
            'email': 'Ange en giltig e-post',
        },
        salary: {
            'invalidNumber': 'Ange ett giltigt belopp',
            'required': 'Detta skriver över default meddelandet för obligatoriska fält'
        }
    };

    typeScriptSimpleListMarkup: string;
    htmlSimpleListMarkup: string;
    examples: Examples = new Examples();

    constructor(htmlEncoder: HtmlEncodeService, private fb: FormBuilder) {
        this.typeScriptSimpleListMarkup =
            htmlEncoder.prepareHighlightedSection(this.examples.typeScriptSimpleFormMarkup, 'typescript');
        this.htmlSimpleListMarkup =
            htmlEncoder.prepareHighlightedSection(this.examples.htmltSimpFormMarkup);
    }
    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.userForm = this.fb.group({
            firstname: ['', [Validators.required, Validators.minLength(2)]],
            lastname: ['', [Validators.required, Validators.minLength(2)]],
            age: ['', [Validators.required, Validators.min(18), Validators.max(120), validateNumber]],
            email: ['', [Validators.required, Validators.email]],
            salary: ['', [Validators.required, validateNumber]],
            favourite_pet: ['', Validators.required],
            interests: [['Koda'], Validators.required]
        });
    }
}

function validateNumber(control: AbstractControl) {
    const pattern = '^[-,−]{0,1}(\\d{1,3}([,\\s.]\\d{3})*|\\d+)([.,]\\d+)?$';

    const regexp = new RegExp(pattern);
    if (regexp.test(control.value)) {
        return null;
    }
    return { invalidNumber: true };
}

