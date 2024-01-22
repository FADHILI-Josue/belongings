import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VariantEnum } from './button.variants';
import { cn } from 'src/lib/utils';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() color!: string;
  @Input() variant!: VariantEnum;
  @Output() btnClick = new EventEmitter();
  ngOnInit(): void {

  }
  onClick(): void {
    this.btnClick.emit()
  }
  getClasses(): string {
    return cn(this.variant, this.variant);
  }
}
