import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { emailConfig } from 'src/assets/constants';
import { NgxSpinnerService } from "ngx-spinner";
import {MatSnackBar} from '@angular/material/snack-bar';
declare var Email: any;
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  constructor(private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar) { }
  imageList: any = [];
  userForm = this.fb.group({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    images: this.fb.array([])
  });

  get formValues() {
    return this.userForm.controls
  }
  get images() {
    return this.userForm.controls["images"] as FormArray;
  }

  onFileAdded(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.images.push(new FormControl({
            name: file.name,
            data: reader.result as string
          }))
        };
      }
    }
  }

  onFormSubmit() {
    this.spinner.show();
    Email.send({
      Host: emailConfig.Host,
      Username: emailConfig.Username,
      Password: emailConfig.Password,
      To: this.formValues.emailAddress.value,
      From: emailConfig.From,
      Subject: emailConfig.Subject,
      Body: "Received a mail from " + this.formValues.firstName.value + " " + this.formValues.lastName.value + " - " + this.formValues.description.value,
      Attachments: this.images.value
    }).then((message: any) => {
      this.formReset();
      this.spinner.hide();
      this.openSnackBar("E-Mail sent Successfully" , "Close")
    });
  }
  formReset() {
    this.userForm.reset();
    this.images.clear();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

