<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_producto');
            $table->decimal('precio_producto',10,2);
            $table->text('descripcion')->nullable();
            //entablo la relacion de el id del usuario con un producto

            //el metodo ondelete('cascade) sirve para borrar un producto que ya no tiene relacion con el usuarios
            $table->foreignId("usuario_id")->constrained('usuarios')->onDelete('cascade');
            $table->foreignId('categoria_id')->constrained('categorias')->onDelete('cascade');
            $table->string('imagen_producto')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
