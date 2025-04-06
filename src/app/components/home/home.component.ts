import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Producto } from "../../interfaces/producto.interface"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { Categoria } from "../../interfaces/categoria.interface"
import { CategoriaServiceService } from "../../services/categoria-service.service"
import { ProductosServiceService } from "../../services/productos-service.service"


@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  productos: Producto[] = []
  productosFiltrados: Producto[] = []
  searchTerm = ""
  sortOption = ""
  currentPage = 1
  categorias: Categoria[] = []
  categoriaSeleccionada: number | null = null
  nombreUsuario: string = '';
  perfilUsuario: string = '';
  imagenCategoria: string = '';

  constructor(private productoService: ProductosServiceService , private router :Router, private categoriaService: CategoriaServiceService ) {}

  ngOnInit(): void {
    this.cargarProductos()
    this.cargarCategorias()
    this.obtenerNombreUsuario();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (productos: Producto[]) => {
        console.log('Productos recibidos:', productos);
        if (productos && productos.length > 0) {
          console.log('Primer producto:', productos[0]);
          console.log('Propiedades del producto:', Object.keys(productos[0]));
        }
        this.productos = productos
        this.productosFiltrados = productos
        this.aplicarFiltros()
      },
      error: (error: any) => {
        console.error("Error al obtener productos:", error)
        if (error.status === 0) {
          console.error("No se pudo conectar con el servidor. Verifica que el backend esté corriendo.")
        }
      },
    })
  }


 
  buscarProductos(event: any): void {
    this.searchTerm = event.target.value
    this.aplicarFiltros()
  }

  ordenarProductos(event: any): void {
    this.sortOption = event.target.value
    this.aplicarFiltros()
  }

  aplicarFiltros(): void {
    let productosFiltrados = [...this.productos]

    // Aplicar búsqueda
    if (this.searchTerm) {
      productosFiltrados = productosFiltrados.filter(
        (producto) =>
          producto.nombre_producto.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          producto.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()),
      )
    }

    // Aplicar filtro por categoría
    if (this.categoriaSeleccionada !== null) {
      productosFiltrados = productosFiltrados.filter(producto => {
        // Si el producto tiene una categoría directamente asociada
        if (producto.categoria && producto.categoria.id === this.categoriaSeleccionada) {
          return true;
        }
        // Si el producto tiene un categoria_id
        if (producto.categoria_id === this.categoriaSeleccionada) {
          return true;
        }
        return false;
      });
    }

    // Aplicar ordenamiento
    switch (this.sortOption) {
      case "precio-asc":
        productosFiltrados.sort((a, b) => a.precio_producto - b.precio_producto)
        break
      case "precio-desc":
        productosFiltrados.sort((a, b) => b.precio_producto - a.precio_producto)
        break
      case "recientes":
        productosFiltrados.reverse()
        break
    }

    this.productosFiltrados = productosFiltrados
  }

  verDetalles(producto: Producto): void {
    // Implementar navegación a la página de detalles
    console.log("Ver detalles del producto:", producto)
  }

  cambiarPagina(page: number): void {
    this.currentPage = page
    // Aquí implementarías la lógica de paginación real
    console.log("Cambiando a página:", page)
  }

  getCategoryName(index: number, producto: Producto): string {
    // Si el producto tiene una categoría directamente asociada, mostrarla
    if (producto.categoria && producto.categoria.nombre_categoria) {
      return producto.categoria.nombre_categoria;
    }
    
    // Si el producto tiene un categoria_id, buscar la categoría correspondiente
    if (producto.categoria_id && this.categorias && this.categorias.length > 0) {
      const categoria = this.categorias.find(cat => cat.id === producto.categoria_id);
      if (categoria) {
        return categoria.nombre_categoria;
      }
    }
    
    // Si no hay categoría asociada, usar el método anterior como fallback
    if (this.categorias && this.categorias.length > 0) {
      const categoryIndex = index % this.categorias.length;
      return this.categorias[categoryIndex].nombre_categoria;
    }
    
    return 'Categoría no disponible';
  }


  cerrarSesion(): void {
    console.log("Se ha cerrado la sesion correctamente");
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    this.router.navigate(['/login'])
  }


  rutaRegistrarProducto(){
    this.router.navigate(['/registrar-producto']);
  }

  cargarCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (categorias: Categoria[]) => {
        console.log('Categorías recibidas:', categorias);
        if (categorias && categorias.length > 0) {
          console.log('Primera categoría:', categorias[0]);
          console.log('Propiedades de la categoría:', Object.keys(categorias[0]));
        }
        this.categorias = categorias;
        this.imagenCategoria = categorias[0].imagen_categoria;
      },
      error: (error: any) => {
        console.error("Error al obtener categorías:", error);
        if (error.status === 0) {
          console.error("No se pudo conectar con el servidor. Verifica que el backend esté corriendo.");
        }
      }
    });
  }

  filtrarPorCategoria(categoriaId: number | null): void {
    this.categoriaSeleccionada = categoriaId;
    this.aplicarFiltros();
    console.log('Filtrando por categoría:', categoriaId);
  }



  rutaRegistrarCategoria(){
    this.router.navigate(['/registar-categoria']);
  }


  


  obtenerNombreUsuario(): void {


    const userData = localStorage.getItem('user');

    if(userData && userData !== 'undefined'){


      const usuario = JSON.parse(userData);


      if(usuario && usuario.user.nombre && usuario.user.perfil_usuario){

        this.nombreUsuario = usuario.user.nombre;

        this.perfilUsuario = usuario.user.perfil_usuario;
      }

    
    }

  }

}

