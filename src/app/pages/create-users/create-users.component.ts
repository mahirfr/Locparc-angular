import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as csvtojson from 'csvtojson';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent {

  formGroup     : FormGroup  ;
  userFirstName : string = "";
  userLastName  : string = "";
  userEmail     : string = "";

  formGroupMultiple : FormGroup;
  file              : File | null = null;


  constructor(private formBuilder: FormBuilder) { 

    this.formGroup = this.formBuilder.group({
      userLastName  : [""  , [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      userFirstName : [""  , [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      userEmail     : [""  , [Validators.required, Validators.email                                 ]],
    });

    this.formGroupMultiple = this.formBuilder.group({ 

    });
  }

  onSubmitFormGroup() {
    console.log(this.formGroup.value);
  }

  onSubmitFormGroupMultiple() {
    console.log(this.formGroupMultiple.value);
    console.log("je suis dans la fonction onSubmitFormGroupMultiple");
  }

  onSelectedFile(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.convertToJson();
    }
  }

  convertToJson() {
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result as string;
      csvtojson()
        .fromString(data)
        .then((json) => {
          console.log(json);
        });
    };
    reader.readAsText(this.file as Blob);
  }

}
