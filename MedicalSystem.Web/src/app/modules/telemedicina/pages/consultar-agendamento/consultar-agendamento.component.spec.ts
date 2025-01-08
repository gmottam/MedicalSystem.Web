import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarAgendamentoComponent } from './consultar-agendamento.component';

describe('ConsultarAgendamentoComponent', () => {
  let component: ConsultarAgendamentoComponent;
  let fixture: ComponentFixture<ConsultarAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarAgendamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
