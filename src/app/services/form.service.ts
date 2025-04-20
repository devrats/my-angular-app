import { Injectable } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private formBuilder: FormBuilder) {}

  login = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  register = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  dsa = this.formBuilder.group({
    topics: this.formBuilder.array([]),
  });

  get loginForm(): FormGroup {
    return this.login;
  }
  get registerForm(): FormGroup {
    return this.registerForm;
  }
  get dsaForm(): FormGroup {
    return this.dsa;
  }

  get topics(): FormArray {
    return this.dsaForm.get('topics') as FormArray;
  }

  loadTopics(topicData: any[]) {
    topicData.forEach((topic) => {
      this.topics.push(this.createTopicFormGroup(topic));
    });
  }

  createTopicFormGroup(topic: any): FormGroup {
    let formGroup = this.formBuilder.group({});
    topic.problems.map((problem: any) =>
      formGroup.addControl(problem.title, new FormControl(problem.opted ? true : false, [Validators.required]))
    );
    return formGroup;
  }
}
