import { Component, type OnInit } from "@angular/core"
import { ApiService } from "../../services/api.service"
import { CommonModule } from "@angular/common"
import { Producto } from "../../interfaces/producto.interface"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"

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
  categorias: string[] = [
    "ELECTRÓNICA",
    "HOGAR Y MUEBLES",
    "DEPORTES Y FITNESS",
    "TECNOLOGÍA",
    "ROPA Y ACCESORIOS",
    "JUGUETES Y JUEGOS",
    "HERRAMIENTAS",
    "ELECTRODOMÉSTICOS",
  ]

  



  constructor(private apiService: ApiService , private router :Router ) {}

  ngOnInit(): void {
    this.cargarProductos()
  }

  cargarProductos(): void {
    this.apiService.obtenerProductos().subscribe({
      next: (productos: Producto[]) => {
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

  getCategoryName(index: number): string {
    return this.categorias[index % this.categorias.length]
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




}

