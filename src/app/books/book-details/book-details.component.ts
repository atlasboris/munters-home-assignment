import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../../shared/book.model';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent implements OnInit {
  book!: Book;
  
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit(): void {
    this.book = this.data?.book;
  }

}
