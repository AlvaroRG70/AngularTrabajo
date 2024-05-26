import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseniasCreateComponent } from './resenias-create.component';

describe('ReseniasCreateComponent', () => {
  let component: ReseniasCreateComponent;
  let fixture: ComponentFixture<ReseniasCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReseniasCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReseniasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
