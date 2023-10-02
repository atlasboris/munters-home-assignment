import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from '../../shared/book.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-add-edit',
  templateUrl: './book-add-edit.component.html',
  styleUrls: ['./book-add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookAddEditComponent implements OnInit {
  book!: Book;
  title!: string;
  bookForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialogRef<any>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.book = this.data?.book;
    this.title = this.book ? 'Edit book' : 'Add book';
    this.bookForm = this.fb.group({
      id: [this.book?.id, [Validators.required, Validators.minLength(3)]],
      title: [this.book?.title, [Validators.required, Validators.minLength(3)]],
      author: [this.book?.author, [Validators.required, Validators.minLength(3)]],
      publishedDate: [this.book?.publishedDate],
      description: [this.book?.description]
    });
  }

  onSubmit() {
    if (!this.bookForm.valid) {
      return;
    }
    const { id, author, title, publishedDate, description } = this.bookForm.value;
    const result = { ...this.book, id, author, title, publishedDate, description };

    this.dialog.close(result);
  }

  cancel(){
    this.dialog.close(null);
  }
}
