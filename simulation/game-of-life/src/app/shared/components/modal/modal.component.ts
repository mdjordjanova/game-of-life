import { Component, Input, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  styleUrls: ['./modal.component.scss'],
  template: `
    <div class="app-modal">
      <div class="app-modal-body">
        <ng-content></ng-content>
      </div>
    </div>
    <div class="app-modal-background"></div>
  `
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;

  constructor(
    private modalService: ModalService,
    private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    document.body.appendChild(this.element);

    this.element.addEventListener('click', el => {
      if (el.target.className === 'app-modal') {
        this.close();
      }
    });

    this.modalService.add(this);
  }

  ngOnDestroy() {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open() {
    this.element.style.display = 'block';
    document.body.classList.add('app-modal-open');
  }

  close() {
    this.element.style.display = 'none';
    document.body.classList.remove('app-modal-open');
  }
}