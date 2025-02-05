import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCofeeComponent } from './buy-cofee.component';

describe('BuyCofeeComponent', () => {
  let component: BuyCofeeComponent;
  let fixture: ComponentFixture<BuyCofeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyCofeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyCofeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
