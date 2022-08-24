import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required]
  })

  // fill selectors
  regions: string[] = []

  constructor(private fb: FormBuilder, private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.regions = this.countriesService.regions
  }

  save() {
    console.log(this.myForm.value)
  }
}
