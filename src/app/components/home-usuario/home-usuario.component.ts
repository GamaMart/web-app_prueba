import { Component } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Usuario} from 'src/app/models/Usuarios';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.css']
})
export class HomeUsuarioComponent {

  listUsuarios: Usuario[] = [];
  usuarioaux: boolean = true;
  usuarioForm: FormGroup;
  id: string | null;
  titulo = 'Crear Usuario';
  constructor(public modal:NgbModal, private fb: FormBuilder, private router: Router, private _usuarioService: UsuarioService, private aRouter: ActivatedRoute){
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      tarea: ['', Validators.required],
      descripcion: ['', Validators.required],
      valiTarea: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  agergarUsuario(){
    console.log(this.usuarioForm);

    this.usuarioForm.get('nombre')?.value;

    const USUARIO: Usuario = {
      nombre: this.usuarioForm.get('nombre')?.value,
      apellidos: this.usuarioForm.get('apellidos')?.value,
      tarea: this.usuarioForm.get('tarea')?.value,
      descripcion: this.usuarioForm.get('descripcion')?.value,
      status: this.usuarioForm.get('valiTarea')?.value,
    }

    console.log(USUARIO);
    this._usuarioService.guardarUsuario(USUARIO).subscribe(data => {
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.usuarioForm.reset();
    })
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this._usuarioService.getUsuarios().subscribe(data => {
      console.log(data);
      this.listUsuarios = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarUsuario(id: any) {
    this._usuarioService.eliminarUsuario(id).subscribe(data => {
      this.obtenerUsuarios();
    }, error => {
      console.log(error);
    })
  }

  esEditar() {

    if(this.id !== null) {

      this.modal.open("contenido")
      this.titulo = 'Editar Usuario';
      this._usuarioService.obtenerUsuario(this.id).subscribe(data => {
        this.usuarioForm.setValue({
          nombre: data.nombre,
          apellidos: data.categoria,
          tarea: data.ubicacion,
          descripcion: data.precio,
          usuarioaux: data.status
        })
      })
    }
  }

}
