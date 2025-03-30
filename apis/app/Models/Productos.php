<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Productos extends Model
{

    use HasFactory;

    protected $fillable = ['nombre_producto','precio_producto','descripcion','usuario_id','imagen_producto','categoria_id'];


    public function usuario(){

        return $this->belongsTo(Usuarios::class,'usuario_id');

    }


    public function categoria(){
        return $this->belongsTo(Categorias::class,'categoria_id');
    }



    
}
