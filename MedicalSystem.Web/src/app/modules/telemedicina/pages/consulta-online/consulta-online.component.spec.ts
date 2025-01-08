import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaOnlineComponent } from './consulta-online.component';

describe('ConsultaOnlineComponent', () => {
  let component: ConsultaOnlineComponent;
  let fixture: ComponentFixture<ConsultaOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaOnlineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
