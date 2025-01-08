import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarConsultaCompoment } from './agendar-consulta.component';

describe('RealizarAgendamentoComponent', () => {
  let component: AgendarConsultaCompoment;
  let fixture: ComponentFixture<AgendarConsultaCompoment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendarConsultaCompoment]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgendarConsultaCompoment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
