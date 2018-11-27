import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ImageResultComponent } from './image-result/image-result.component';
import { NgbdDropdownBasicComponent } from './navigation/dropdown-basic';
import { HttpClientModule } from '@angular/common/http';
import { ImageService } from './image.service';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './services/authentication.service';
import { StorageService } from './services/storage.service';
import { CaptionsComponent } from './captions/captions.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ImageResultComponent,
    NgbdDropdownBasicComponent,
    HomeComponent,
    CaptionsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [AuthenticationService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
