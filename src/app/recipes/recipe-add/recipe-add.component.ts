import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {RecipesService} from '../recipes.service';
import {Router} from '@angular/router';
import {ToastService} from '../../core/services/toast.service';

@Component({
  selector: 'app-recipe-add',
  standalone: false,
  templateUrl: './recipe-add.component.html',
  styleUrl: './recipe-add.component.scss'
})
export class RecipeAddComponent implements OnInit {
  public recipeForm: FormGroup = new FormGroup({});
  public imagePreview: string | null = null;
  public imageNotUploaded = false;
  public recipeIngredientsInvalid = false;
  public recipeInstructionsInvalid = false;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  constructor(private fb: FormBuilder, private router: Router, private recipeService: RecipesService, private toastService: ToastService) {
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
      recipeIngredients: this.fb.array([this.createIngredientFormGroup()], this.minOneFormGroupValidator()),
      recipeInstructions: this.fb.array([this.createInstructionStepGroup()], this.minOneFormGroupValidator()),
      recipeImage: [null, Validators.required]
    });
  }

  private minOneFormGroupValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!(control instanceof FormArray)) {
        return null;
      }

      const hasNonEmptyFormGroup = control.controls.some((formGroup: AbstractControl) => {
        if (formGroup instanceof FormGroup) {
          return Object.values(formGroup.controls).some(ctrl => !!ctrl.value);
        }
        return false;
      });

      return hasNonEmptyFormGroup ? null : { 'noNonEmptyFormGroup': true };
    };
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
    this.toastService.showSuccess('რეცეპტი წარმატებით დაემატა');
    if(this.recipeForm.valid) {
      this.recipeService.addRecipe(this.recipeForm.value).subscribe(() => {
        this.router.navigate(['/recipes'])
      })
    }
  }

}
