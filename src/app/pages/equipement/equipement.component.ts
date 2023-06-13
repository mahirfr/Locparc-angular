import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/Category/Category';
import { SubCategory } from 'src/app/model/Category/SubCategory';
import { Manufacturer } from 'src/app/model/Manufacturer/Manufacturer';
import { Model } from 'src/app/model/Manufacturer/Model';
import { CategoriesService } from 'src/app/service/categories.service';
import { ManufacturersService } from 'src/app/service/manufacturers.service';
import { ModelService } from 'src/app/service/model.service';
import { SubCategoryService } from 'src/app/service/sub-category.service';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrls: ['./equipement.component.css']
})
export class EquipementComponent {

  categories          : Category    [] = [];
  manufacturers       : Manufacturer[] = [];
  formGroup           : FormGroup;
  itemName            : string = "";
  selectedSubCategory : string = "";
  selectedModel       : string = "";
  serialNumber        : string = "";
  itemDescription     : string = "";
  quantity            : number = 1 ;
  // warantyDate         : string = "";
  // arrivalDate         : string = "";
  existing            : boolean = true;
  onMaintenance       : boolean = false;

  // TODO: add a form group for adding a subcategory

  // TODO: add a form group for adding a model

  // form group for category
  formGroupCategory   : FormGroup;
  categoryName        : string = "";

  // form group for manufacturer
  formGroupManufacturer      : FormGroup;
  manufacturerName           : string = "";

  // form group for adding a sub category
  formGroupSubCategory       : FormGroup;
  subCategoryName            : string = "";
  categoryId                 : number = 0;

  // form group for adding a model
  formGroupModel             : FormGroup;
  modelName                  : string = "";
  manufacturerId             : number = 0;

  static numberPattern = "^[0-9]*$";
  static datePattern   = "^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])-d{4}$";
  

  constructor(private formBuilder        : FormBuilder         ,
              private categoryService    : CategoriesService   ,
              private manufacturerService: ManufacturersService,
              private subCategoryService : SubCategoryService  ,
              private modelService       : ModelService
              ) {
                  // form group for adding an item
                  this.formGroup = this.formBuilder.group({
                    itemName           : ["", [Validators.required]], 
                    selectedSubCategory: ["", [Validators.required]],
                    selectedModel      : "",
                    serialNumber       : "",
                    itemDescription    : "",
                    quantity           : ["",  [Validators.required]],
                    // validator pattern for date
                    // arrivalDate        : ["", [Validators.pattern("^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])-d{4}$")]],
                    // warantyDate        : ["", [Validators.pattern("^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])d{4}$")]],
                    existing           : true,
                    onMaintenance      : false,
                  }); 
                  // form group for category
                  this.formGroupCategory = this.formBuilder.group({
                    categoryName       : ["", [Validators.required]],
                  });
                  // form group for manufacturer
                  this.formGroupManufacturer = this.formBuilder.group({
                    manufacturerName   : ["", [Validators.required]],
                  });
                  // form group for adding a sub category
                  this.formGroupSubCategory = this.formBuilder.group({
                    subCategoryName    : ["", [Validators.required]],
                  });
                  // form group for adding a model
                  this.formGroupModel = this.formBuilder.group({
                    modelName          : ["", [Validators.required]],
                  });
  }

  ngOnInit() {
		this.categoryService.getAllCategories().subscribe(
			categories => this.categories = categories
		);
    this.manufacturerService.getAllManufacturers().subscribe(
      manufacturers => this.manufacturers = manufacturers
    );
	}

  onSelectedSubCatValueChange() {
    this.selectedSubCategory = this.formGroup.get('selectedSubCategory')?.value;
    // disable model input if the selected sub category doesn't have models
    for(let i = 0; i < this.categories.length; i++) 
      for(let j = 0; j < this.categories[i].subCategories.length; j++) 
        if (this.categories[i].subCategories[j].name == this.selectedSubCategory) 
          if (this.categories[i].name !== "INFORMATIQUE") {
            this.formGroup.get('selectedModel')?.disable(); 
            return;
          }
  }


  onSelectedModelValueChange() {
    this.selectedModel = this.formGroup.get('selectedModel')?.value
  }
  

  // openCategoryModal() {
  //   // open modal for adding a category
  // }

  // openManufacturerModal() {
  //   // open modal for adding a manufacturer

  // }

  openSubCategoryModal(categoryId: number) {
    // open modal for adding a sub categor
    if (categoryId == undefined) return;
    this.categoryId = categoryId;

  }
  
  openModelModal(manufacturerId: number) {
    // open modal for adding a model
    if (manufacturerId == undefined) return;
    this.manufacturerId = manufacturerId;
  }
  
  onSubmit() {
    // add item to database
    console.log(this.formGroup.value);
  }

  onSubmitCategory() {
    // add category to database
  }

  onSubmitManufacturer() {
    // add manufacturer to database
  }

  onSubmitSubCategory() {
    // add sub category to database
    this.subCategoryName = this.formGroupSubCategory.get('subCategoryName')?.value;

    if (this.categoryId != 0 && this.subCategoryName.length != 0) {

      // find category by id from list of categories
      const category: Category | undefined = this.categories.find(category => category.id == this.categoryId);

      if (category == undefined) {
        console.log("Category not found");
        return;
      }

      category.id = this.categoryId;

      const subCategory: SubCategory = {
        name: this.subCategoryName,
        category: category
      }

      this.subCategoryService.create(subCategory).subscribe(
        {
          next: (response) => { 
            console.log("Sous catégorie créée avec succès", response);
          },
          error: (error) => {
            console.log("Une erreur est survenue, reesayez plus tard", error);
          }
        });
      // update category with new sub category from the category list
      // update categories list
      // this.categoryService.getAllCategories().subscribe(
      //   categories => this.categories = categories
      // );
      this.categories.find(category => category.id == this.categoryId)?.subCategories.push(subCategory);
    }
  }

  onSubmitModel() {
    // add model to database
    this.modelName = this.formGroupModel.get('modelName')?.value;

    if (this.manufacturerId != 0 && this.modelName.length != 0) {

      // find manufacturer by id from list of manufacturers
      const manufacturer: Manufacturer | undefined = this.manufacturers.find(manufacturer => manufacturer.id == this.manufacturerId);

      if (manufacturer == undefined) {
        console.log("Manufacturer not found");
        return;
      }

      manufacturer.id = this.manufacturerId;

      const model: Model = {
        reference: this.modelName,
        manufacturer: manufacturer
      }

      this.modelService.create(model).subscribe(
        {
          next: (response) => {
            console.log("Modèle créé avec succès", response);
          },
          error: (error) => {
            console.log("Une erreur est survenue, reesayez plus tard", error);
          }
        });
      // update manufacturer with new model from the manufacturer list
      this.manufacturers.find(manufacturer => manufacturer.id == this.manufacturerId)?.models.push(model);
      
      // refresh manufacturers list
      // this.manufacturerService.getAllManufacturers().subscribe(
      //   (        manufacturers: any) => this.manufacturers = manufacturers
      // );
    }
  }
}

