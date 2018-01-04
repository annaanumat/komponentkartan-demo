import { Component, OnInit } from '@angular/core';
import {
  ExpandableRow, NotificationIcon, RowNotification, NotificationType, ModalService,
  ModalButtonConfiguration, SortChangedArgs, ListHeaderComponent, SortDirection
} from 'vgr-komponentkartan/dist';
import { Examples } from '../examples';
import { HtmlEncodeService } from '../../../html-encode.service';

@Component({
  selector: 'app-listexample',
  templateUrl: './listexample.component.html',
  styleUrls: ['./listexample.component.scss']
})
export class ListexampleComponent {
  sortDirections = SortDirection;
  public peopleRows: ExpandableRow<ExamplePerson, ExamplePerson>[];
  examplePeople: ExamplePerson[];
  typeScriptAdvancedListMarkup: string;
  htmlAdvancedListMarkup: string;
  examples: Examples = new Examples();
  readOnly = true;





  constructor(htmlEncoder: HtmlEncodeService) {
    this.typeScriptAdvancedListMarkup =
      htmlEncoder.prepareHighlightedSection(this.examples.typeScriptAdvancedListMarkup, 'typescript');
    this.htmlAdvancedListMarkup =
      htmlEncoder.prepareHighlightedSection(this.examples.htmlAdvancedListMarkup);
    this.examplePeople = [
      { id: '1', firstName: 'Adam', lastName: 'Andersson' } as ExamplePerson,
      { id: '2', firstName: 'Bjarne', lastName: 'Bengtsson' } as ExamplePerson,
      { id: '3', firstName: 'Carola', lastName: 'Claesson' } as ExamplePerson,
      { id: '4', firstName: 'Daniella', lastName: 'Di Maria Marquez ' } as ExamplePerson,
      { id: '5', firstName: 'Erik', lastName: '' } as ExamplePerson,
    ];

    this.peopleRows = this.examplePeople.map(x => new ExpandableRow<ExamplePerson, ExamplePerson>(x));

    this.peopleRows[0].notification = {
      message: 'Information saknas', icon: NotificationIcon.ExclamationRed,
      type: NotificationType.Permanent
    } as RowNotification;
    this.peopleRows[4].notification = {
      message: 'Personen är inaktiv', icon: NotificationIcon.Exclamation,
      type: NotificationType.Permanent
    } as RowNotification;
  }

  deleteRow(row: ExpandableRow<ExamplePerson, ExamplePerson>) {
    // Remove visually.
    row.notifyOnRemove(row.previewObject.firstName + ' togs bort och kommer inte längre att kunna logga in', NotificationIcon.Ok);

    /*
     Remove for real...
    */
  }

  updateRow(row: ExpandableRow<ExamplePerson, ExamplePerson>) {
    row.notifyOnCollapse(row.previewObject.firstName + ' sparades', NotificationIcon.OkGreen);
  }

  onSortChanged(event: SortChangedArgs) {
    this.peopleRows = this.peopleRows.sort((row1, row2) => {
      return row1.previewObject[event.key] > row2.previewObject[event.key] ? (event.direction === SortDirection.Ascending ? 1 : -1) :
        row1.previewObject[event.key] < row2.previewObject[event.key] ? (event.direction === SortDirection.Ascending ? -1 : 1) : 0;
    });
  }
}

export interface ExamplePerson {
  id: string;
  firstName: string;
  lastName: string;
}
