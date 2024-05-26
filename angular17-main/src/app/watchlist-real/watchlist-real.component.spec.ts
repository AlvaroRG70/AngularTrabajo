import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistRealComponent } from './watchlist-real.component';

describe('WatchlistRealComponent', () => {
  let component: WatchlistRealComponent;
  let fixture: ComponentFixture<WatchlistRealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WatchlistRealComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WatchlistRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
