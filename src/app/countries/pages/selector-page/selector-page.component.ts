import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
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
    border: ['', Validators.required],
  });

  // fill selectors
  regions: string[] = [];
  countries: CountrySmall[] = [];
  // borders: string[] = [];
  borders: CountrySmall[] = [];

  // ui
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.regions = this.countriesService.regions;

    // When the regions changes
    this.myForm
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.myForm.get('country')?.reset('');
          this.loading = true;
        }),
        switchMap((region) =>
          this.countriesService.getCountriesByRegion(region)
        )
      )
      .subscribe((countries) => {
        this.countries = countries;
        this.loading = false;
      });

    // When the country changes
    this.myForm
      .get('country')
      ?.valueChanges.pipe(
        tap((_) => {
          this.myForm.get('border')?.reset('');
          this.loading = true;
        }),
        switchMap((code) => this.countriesService.getCountryByCode(code)),
        switchMap((country) =>
          this.countriesService.getCountriesByCode(country?.borders!)
        )
      )
      .subscribe((countries) => {
        // this.borders = country?.borders || [];
        this.borders = countries;
        this.loading = false;
      });
  }

  save() {
    console.log(this.myForm.value);
  }
}
