import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  createForm: FormGroup;
  title = 'evigway-application';
  users: any;

  sampleformsType = {
    title: 'Simple Form',
    fields: [
      {
        type: 'text',
        label: 'Name',
        name: 'name',
        validations: ['required'],
      },
      {
        type: 'email',
        label: 'Email',
        name: 'email',
        validations: ['required'],
      }
    ],
  };

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // this.createForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   name: ['', [Validators.required, Validators.minLength(3)]],
    // });

    this.createForm = this.fb.group({})

    this.sampleformsType.fields.forEach((field)=>{
      const validations = [];
      if(field.validations.includes('required')) {
        validations.push(Validators.required);
      }
      if(field.validations.includes('email')) {
        validations.push(Validators.email);
      }

      this.createForm.addControl(field.name, this.fb.control('', validations));
    })
  }
  
  ngOnInit(): void {
    this.getData();
  }

  onSubmit() {
    this.http
      .post('http://localhost:4000/savedata', this.createForm.value)
      .subscribe((res: any) => {
        this.getData();
      });
  }

  getData() {
    this.http.get('http://localhost:4000/data').subscribe((res: any) => {
      this.users = res.data;
    });
  }
}
