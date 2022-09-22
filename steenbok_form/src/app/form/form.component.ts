import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

declare var Email : any;
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  constructor(private spinner: NgxSpinnerService,
              private formbuild:FormBuilder) { }
  imageList: any = [];
  userForm = new FormGroup({
    firstName: new FormControl('' , Validators.required),
    lastName: new FormControl('', Validators.required),
    description: new FormControl('' , Validators.required),
    emailAddress: new FormControl('' , [Validators.required, Validators.email] ) ,
    image: this.formbuild.array([])
  });



  get formValues() {
    return this.userForm.controls
  }
  get image() : FormArray {
    return this.userForm.get("image") as FormArray
  }
  attachments: any = [];
  onFileAdded(event: any){
    const reader = new FileReader();  
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
         //this.imageList.push(reader.result as string);
         this.imageList.push({
          name: file.name,
          data: reader.result as string
         })
        this.image.push(file)
      };
    }
  }

  onFormSubmit(){
    this.spinner.show();
    Email.send({
      Host : "smtp.elasticemail.com",
      Username : "akshaya.m2810@gmail.com",
      Password : "EC3DA46FCBCA0FF42D3B2D154C2701738764",
      To : this.formValues.emailAddress.value,
      From : "akshaya.m2810@gmail.com",
      Subject : "User Form Data",
      Body : "Received a mail from " + this.formValues.firstName.value + " " + this.formValues.lastName.value + " - " + this.formValues.description.value,
      Attachments: this.imageList
      }).then( (message: any) => {
        this.formReset();
        this.spinner.hide();
      } );        
      }
      formReset(){
        this.image.clear();
        this.userForm.reset();
      }
  }

