import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ImageResultComponent } from './image-result/image-result.component';
import { NgbdDropdownBasicComponent } from './dropdown-basic';
import { HttpClientModule } from '@angular/common/http';
import { ImageService } from './image.service';
import { HttpModule } from '@angular/http';



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
    HttpClientModule,
    FormsModule,
    HttpModule,
    AppRoutingModule

  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
