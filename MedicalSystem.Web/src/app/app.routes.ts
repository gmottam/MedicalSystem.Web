import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AgendarConsultaCompoment } from './modules/telemedicina/pages/agendar-consulta/agendar-consulta.component';
import { ConsultarAgendamentoComponent } from './modules/telemedicina/pages/consultar-agendamento/consultar-agendamento.component';
import { CadastrarPacienteComponent } from './modules/paciente/pages/cadastrar-paciente/cadastrar-paciente.component';
import { EditarPacienteComponent } from './modules/paciente/pages/editar-paciente/editar-paciente.component';
import { ConsultarPacienteComponent } from './modules/paciente/pages/consultar-paciente/consultar-paciente.component';
import { VisualizarProntuarioComponent } from './modules/paciente/pages/visualizar-prontuario/visualizar-prontuario.component';
import { CadastrarProfissionalComponent } from './modules/profissional/pages/cadastrar-profissional/cadastrar-profissional.component';
import { ConsultarProfissionalComponent } from './modules/profissional/pages/consultar-profissional/consultar-profissional.component';
import { EditarProfissionalComponent } from './modules/profissional/pages/editar-profissional/editar-profissional.component';
import { ConsultaOnlineComponent } from './modules/telemedicina/pages/consulta-online/consulta-online.component';
import { CadastrarUsuarioComponent } from './modules/usuario/pages/cadastrar-usuario/cadastrar-usuario.component';
import { EditarUsuarioComponent } from './modules/usuario/pages/editar-usuario/editar-usuario.component';
import { ConsultarUsuarioComponent } from './modules/usuario/pages/consultar-usuario/consultar-usuario.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },

  //Agenda
  { path: 'agendar-consulta/:id', component: AgendarConsultaCompoment },

  //Paciente
  { path: 'consultar-agendamento', component: ConsultarAgendamentoComponent },
  { path: 'cadastrar-paciente', component: CadastrarPacienteComponent },
  { path: 'editar-paciente/:id', component: EditarPacienteComponent },
  { path: 'consultar-paciente', component: ConsultarPacienteComponent },
  { path: 'visualizar-prontuario/:id', component: VisualizarProntuarioComponent },

  //Profissional
  { path: 'cadastrar-profissional', component: CadastrarProfissionalComponent },
  { path: 'editar-profissional/:id', component: EditarProfissionalComponent },
  { path: 'consultar-profissional', component: ConsultarProfissionalComponent },

  //Usuario
  { path: 'cadastrar-usuario', component: CadastrarUsuarioComponent },
  { path: 'editar-usuario/:id', component: EditarUsuarioComponent },
  { path: 'consultar-usuario', component: ConsultarUsuarioComponent },

  //Telemedicina
  { path: 'consulta-online', component: ConsultaOnlineComponent },

  //Pagina Nao Encontrada - Sempre deverá ficar por último
  { path: '**', component: PaginaNaoEncontradaComponent },
];