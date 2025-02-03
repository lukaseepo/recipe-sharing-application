import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../core/services/toast.service';
import {UtilityService} from '../../core/services/utility.service';
import {minOneFormGroupValidator} from '../../core/validators/minOneFormControlValue';

@Component({
  selector: 'app-recipe-add',
  standalone: false,
  templateUrl: './recipe-add.component.html',
  styleUrl: './recipe-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeAddComponent implements OnInit {
  public recipeForm: FormGroup = new FormGroup({});
  public imagePreview: string | null = null;
  public recipeId = '';
  public imageNotUploaded = false;
  public recipeIngredientsInvalid = false;
  public recipeInstructionsInvalid = false;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  constructor(private fb: FormBuilder, private utilityService: UtilityService, private cdr: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private recipeService: RecipesService, private toastService: ToastService) {
  }

  public get recipeIngredients(): FormArray {
    return this.recipeForm.get('recipeIngredients') as FormArray;
  }

  public get recipeInstructions(): FormArray {
    return this.recipeForm.get('recipeInstructions') as FormArray;
  }

  public addIngredient(): void {
    this.recipeIngredients.push(this.createIngredientFormGroup());
  }

  public addInstruction(): void {
    this.recipeInstructions.push(this.createInstructionStepGroup());
  }

  public createIngredientFormGroup(): FormGroup {
    return this.fb.group({
      ingredient: ['']
    });
  }
  public createInstructionStepGroup(): FormGroup {
    return this.fb.group({
      step: ['']
    });
  }

  public getRecipeByIdAndPatchValue(): void {
    this.recipeService.getRecipeById(this.recipeId).subscribe((recipe) => {
      this.recipeForm.patchValue({
        recipeTitle: recipe.recipeTitle,
        recipeDescription: recipe.recipeDescription,
        recipeImage: recipe.recipeImage
      });

      this.imagePreview = recipe.recipeImage;

      this.recipeIngredients.clear();
      recipe.recipeIngredients.forEach(ingredient => {
        this.recipeIngredients.push(this.fb.group({
          ingredient: ingredient.ingredient
        }));
      });

      this.recipeInstructions.clear();
      recipe.recipeInstructions.forEach(instruction => {
        this.recipeInstructions.push(this.fb.group({
          step: instruction.step
        }));
      });
      this.cdr.markForCheck();
    });
  }

  public deleteIngredient(index: number): void {
    if (this.recipeIngredients.length > 1) {
      this.recipeIngredients.removeAt(index);
    }
  }

  public deleteInstruction(index: number): void {
    if (this.recipeInstructions.length > 1) {
      this.recipeInstructions.removeAt(index);
    }
  }

  public onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.handleImageUpload(file);
  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer?.files[0];
    if (file) {
      this.handleImageUpload(file);
    }
  }

  private handleImageUpload(file: File): void {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.imagePreview = base64String;
        this.imageNotUploaded = false;
        this.recipeForm.patchValue({
          recipeImage: base64String
        });
      };
      reader.readAsDataURL(file);
    }
  }

  public removeImage(): void {
    this.imagePreview = null;
    this.recipeForm.patchValue({
      recipeImage: null
    });
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }


  public ngOnInit(): void {
    this.recipeForm = this.fb.group({
      recipeTitle: ['', Validators.required],
      recipeDescription: ['', Validators.required],
      recipeIngredients: this.fb.array([this.createIngredientFormGroup()], minOneFormGroupValidator()),
      recipeInstructions: this.fb.array([this.createInstructionStepGroup()], minOneFormGroupValidator()),
      recipeImage: [null, Validators.required]
    });

    this.recipeId = this.route.snapshot.params['id'];

    if(this.recipeId) {
      this.getRecipeByIdAndPatchValue();
    }
  }

  public submitForm() {
    this.recipeForm.markAllAsTouched();

    if(!this.imagePreview) {
      this.imageNotUploaded = true;
    }
    if(this.recipeIngredients.invalid) {
      this.recipeIngredientsInvalid = true;
    }
    if(this.recipeInstructions.invalid) {
      this.recipeInstructionsInvalid = true;
    }

    const formValue = {...this.recipeForm.value};

    formValue.recipeIngredients = this.utilityService.filterEmptyValues(formValue.recipeIngredients, 'ingredient');
    formValue.recipeInstructions = this.utilityService.filterEmptyValues(formValue.recipeInstructions, 'step');

    if(this.recipeForm.valid) {
      if(this.recipeId) {
        this.recipeService.editRecipe(formValue, this.recipeId).subscribe((res) => {
          this.router.navigate([`/recipes/recipe-details/${this.recipeId}`]);
        })
      } else {
        this.recipeService.addRecipe(formValue).subscribe(() => {
          this.router.navigate(['/recipes'])
        })
      }
      this.cdr.markForCheck();
      this.toastService.showSuccess(this.recipeId ? 'რეცეპტი წარმატებით დარედაქტირდა' : 'რეცეპტი წარმატებით დაემატა');
    }
  }

}
