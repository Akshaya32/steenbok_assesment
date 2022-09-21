import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

declare var Email : any;
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  imageList: any = [];
  userForm = new FormGroup({
    firstName: new FormControl('' , Validators.required),
    lastName: new FormControl('', Validators.required),
    description: new FormControl('' , Validators.required),
    emailAddress: new FormControl('' , [Validators.required, Validators.email] ) ,
  });

  constructor() { }

  get formValues() {
    return this.userForm.controls
  }
  onFileAdded(event: any){
    const reader = new FileReader();  
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
         this.imageList.push(reader.result as string);
        // this.myForm.patchValue({
        //   fileSource: reader.result
        // });
      };
    }
  }

  onFormSubmit(){
    Email.send({
      Host : "smtp.elasticemail.com",
      Username : "akshaya.m2810@gmail.com",
      Password : "EC3DA46FCBCA0FF42D3B2D154C2701738764",
      To : "akshaya.m2895@gmail.com",
      From : "akshaya.m2810@gmail.com",
      Subject : "Test",
      Body : "Testing"
      }).then( (message: any) => {alert(message);} );
        
      }
  }

