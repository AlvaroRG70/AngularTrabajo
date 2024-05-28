import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoPagadoRevisarComponent } from './pedido-pagado-revisar.component';

describe('PedidoPagadoRevisarComponent', () => {
  let component: PedidoPagadoRevisarComponent;
  let fixture: ComponentFixture<PedidoPagadoRevisarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PedidoPagadoRevisarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidoPagadoRevisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
