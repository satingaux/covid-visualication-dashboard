import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BottomSheetComponent, BottomSheetMenu } from './bottom-sheet/bottom-sheet.component';
import { DemoMaterialModule } from './material-module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { DistrictComponent } from './district/district.component';


@NgModule({
  declarations: [
    AppComponent,
    BottomSheetComponent,
    BottomSheetMenu,
    MapComponent,
    DistrictComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    MatSidenavModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [BottomSheetComponent, BottomSheetMenu],
  bootstrap: [AppComponent]
})
export class AppModule { }
