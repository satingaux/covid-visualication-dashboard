import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet,
              private snackbarService: SnackbarService, ) {}

  ngOnInit()  {}

  open(msg) {
    this.snackbarService.changeCurrentPage(msg);
    this.snackbarService.openSnackBar('Welcome to ' + msg, 'close');
    this.bottomSheet.dismiss();
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetMenu);
  }

}


@Component({
  selector: 'bottom-sheet-menu',
  templateUrl: 'bottom-sheet-overview-example-sheet.html',
})
export class BottomSheetMenu {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetMenu>,
              private snackbarService: SnackbarService ) {}

  open(newPage) {
    this.snackbarService.changeCurrentPage(newPage);
    this.bottomSheetRef.dismiss();
    // event.preventDefault();
  }
  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
