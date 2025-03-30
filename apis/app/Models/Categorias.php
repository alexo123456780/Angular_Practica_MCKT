<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Categorias extends Model
{

    use HasFactory;


    protected $fillable = ['nombre_categoria'];


    public function producto(){

        return $this->hasMany(Productos::class,'categoria_id');


    }



    


    
}
