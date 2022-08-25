import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountrySmall } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css'],
})
export class SelectorPageComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
  });

  // fill selectors
  regions: string[] = [];
  countries: CountrySmall[] = [];

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.regions = this.countriesService.regions;

    // When the regions changes
    this.myForm
      .get('region')
      ?.valueChanges.subscribe((region) => {
        this.countriesService.getCountriesByRegion(region)
          .subscribe(countries => {
            console.log(countries)
            this.countries = countries
          })
      });
  }

  save() {
    console.log(this.myForm.value);
  }
}
