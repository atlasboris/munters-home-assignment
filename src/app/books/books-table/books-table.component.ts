import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { Book } from '../../shared/book.model';
import { MatDialog } from '@angular/material/dialog';
import { BookAddEditComponent } from '../book-add-edit/book-add-edit.component';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { BooksService } from '../../shared/books.service';
import { filter, map, takeUntil} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AbstractComponent } from 'src/app/shared/abstract-component';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksTableComponent
  extends AbstractComponent
  implements AfterViewInit
{
  DATA: Book[] = [];
  bookColumns: string[] = [
    'id',
    'title',
    'author',
    'publishedDate',
    'description',
    'categories',
    'actions',
  ];

  bookList!: MatTableDataSource<Book>;
  constructor(
    private booksService: BooksService,
    private dr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    super();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.booksService
      .getBooks()
      .pipe(
        takeUntil(this.unsubscribe$),
        map((result: any) => {
          let _data = Object.values(result).map((res: any) => {
            const book: Book = {
              id: res.id,
              title: res.volumeInfo?.title,
              author: res.volumeInfo?.authors[0],
              publishedDate: new Date(res.volumeInfo?.publishedDate),
              description: res.volumeInfo?.description,
              categories: res.volumeInfo?.categories,
              thumbnail: res.volumeInfo?.imageLinks?.thumbnail,
              link: res.volumeInfo?.canonicalVolumeLink,
            };
            return book;
          });

          return _data;
        })
      )
      .subscribe((result) => {
        this.DATA = result;
        this.bookList = new MatTableDataSource<Book>(this.DATA);
        this.bookList.paginator = this.paginator;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.bookList.filter = filterValue.trim().toLowerCase();
  }

  showBookInfo(book: Book) {
    const dialogRef = this.dialog.open(BookDetailsComponent, {
      width: '500px',
      data: {
        book,
      },
    });
  }

  addBook() {
    const dialogRef = this.dialog.open(BookAddEditComponent, {
      width: '500px',
      data: {},
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((book) => {
        if (book) {
          this.bookList.data = [book, ...this.bookList.data];
          this.dr.detectChanges();
        }
      });
  }

  editBook(book: Book) {
    const index = this.bookList.data.indexOf(book);
    const dialogRef = this.dialog.open(BookAddEditComponent, {
      width: '500px',
      data: {
        book,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((res) => !!res)
      )
      .subscribe((book) => {
        if (book) {
          this.bookList.data[index] = { ...book };
          this.bookList.data = [...this.bookList.data];
        }
      });
  }

  deleteBook(book: Book) {
    const index = this.bookList.data.indexOf(book);

    if (index >= 0) {
      this.bookList.data.splice(index, 1);
      this.bookList.data = [...this.bookList.data];
    }
  }
}
