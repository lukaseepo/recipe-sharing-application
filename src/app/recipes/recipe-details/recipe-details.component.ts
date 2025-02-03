import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef} from '@angular/core';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from '../../shared/models/recipe';
import {MatDialog} from '@angular/material/dialog';
import {ToastService} from '../../core/services/toast.service';

@Component({
  selector: 'app-recipe-details',
  standalone: false,
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailsComponent implements OnInit {
  public recipe!: Recipe;
  public constructor(private recipeService: RecipesService, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private toastService: ToastService, private dialog: MatDialog, private router: Router) {
  }

  public ngOnInit() {
   this.getRecipeById();
  }

  public getRecipeById() {
    this.recipeService.getRecipeById(this.route.snapshot.params['id']).subscribe((res) => {
      this.recipe = res;
      this.cdr.markForCheck();
    })
  }

  public deleteRecipe() {
    this.recipeService.deleteRecipeById(this.route.snapshot.params['id']).subscribe(() => {
      this.router.navigate(['/recipes']);
      this.toastService.showSuccess('რეცეპტი წარმატებით წაიშალა');
      this.cdr.markForCheck();
    });
  }

  public openDeleteConfirmationDialog(confirmationDialog: TemplateRef<void>) {
    this.dialog.open(confirmationDialog);
  }

}
