import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-quill-editor',
  standalone: false,
  templateUrl: './quill-editor.component.html',
  styleUrl: './quill-editor.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: QuillEditorComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuillEditorComponent {
  @Input() public description = '';
  @Input() public editorInvalid = false;
  private _value = '';
  get value(): string {
    return this._value;
  }
  set value(val: string) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }
  public constructor() {}

  public onChange: (value: string) => void = () => {};
  public onTouched: () => void = () => {};
  writeValue(obj: string): void {
    this.value = obj;
  }

  modules = {
    toolbar: [['bold', 'italic', 'link']],
  };
  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
