import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { BooksTableComponent } from './books-table/books-table.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookAddEditComponent } from './book-add-edit/book-add-edit.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { EllipsisPipe } from '../shared/ellipsis.pipe';



@NgModule({
  declarations: [
    EllipsisPipe,
    BooksComponent,
    BooksTableComponent,
    BookDetailsComponent,
    BookAddEditComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: "",    
        component: BooksComponent
      }
    ])
  ],
  exports:[
    BooksComponent
  ]
})
export class BooksModule { }
