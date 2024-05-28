import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaComentariosUsuarioComponent } from './lista-comentarios-usuario.component';

describe('ListaComentariosUsuarioComponent', () => {
  let component: ListaComentariosUsuarioComponent;
  let fixture: ComponentFixture<ListaComentariosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaComentariosUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaComentariosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
