import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environments } from '../environments/environments.environments';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgOptimizedImage, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'Portfolio Matias';
  myEmail: string = "matiassabbadini24@gmail.com"
  htmlText: string = 'HTML5'
  cssText: string = 'CSS3'
  anioHoy: number = new Date().getFullYear();
  currentDate: Date = new Date();
  sumMonth: number = 0;
  diaHoy: number = 0;  
  userEmail: string = '';
  userName: string = '';
  message: string = '';
  publicKey: string = '';
  emailServiceId: string = '';
  templateId: string = '';
  public formBuilder = inject(FormBuilder)
  contactForm: FormGroup;
  
  constructor(){
    this.diaHoy = this.currentDate.getDate();
    this.sumMonth = this.currentDate.getMonth() + 1;
    this.publicKey = environments.emailPublicKey
    this.emailServiceId = environments.emailServiceId
    this.templateId = environments.emailTemplateId

    this.contactForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      userEmail: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      message: ['', [Validators.required,Validators.minLength(50), Validators.maxLength(200)]]
    });
  }
  
  sendEmail(event: any) {
    event.preventDefault();

    if (this.contactForm.valid) {
      const templateParams = {
        from_name:this.contactForm.controls['userName'].value,
        reply_to:this.contactForm.controls['userEmail'].value,
        message: this.contactForm.controls['message'].value
      };

    emailjs.send(this.emailServiceId, this.templateId, templateParams, this.publicKey)
    .then((result: EmailJSResponseStatus) => {
      console.log(result.text);
      if(result.text){
        this.userEmail = '';
        this.userName = '';
        this.message = '';
      }
    }, (error) => {
      console.log(error.text);
    });
} else {
    console.log("ERRORRR!!!!")
}
    } 

}
