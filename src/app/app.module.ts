import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ImageResultComponent } from './image-result/image-result.component';
import { NgbdDropdownBasicComponent } from './dropdown-basic';
import { HttpClientModule } from '@angular/common/http';
import { ImageService } from './image.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ImageResultComponent,
    NgbdDropdownBasicComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
