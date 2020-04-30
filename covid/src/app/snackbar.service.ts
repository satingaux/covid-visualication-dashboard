import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  currentPage = 'Home';
  constructor(private snackBar: MatSnackBar,
              private titleService: Title) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
    });
  }

  changeCurrentPage(newPage) {
    this.titleService.setTitle(newPage+ ' | Sachin Sharma');
    this.currentPage = newPage;
  }
}
