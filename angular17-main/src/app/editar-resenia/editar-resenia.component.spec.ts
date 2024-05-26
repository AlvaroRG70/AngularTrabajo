import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarReseniaComponent } from './editar-resenia.component';

describe('EditarReseniaComponent', () => {
  let component: EditarReseniaComponent;
  let fixture: ComponentFixture<EditarReseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarReseniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarReseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
