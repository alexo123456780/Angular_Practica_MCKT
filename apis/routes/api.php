<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductoController;
use App\Http\Controllers\UsuariosController;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientesController;

use App\Http\Controllers\ClientesAuthController;

use App\Http\Controllers\CategoriaController;


//login usuarios
Route::post('login',[AuthController::class,'login']);



//usuarios
Route::apiResource('usuarios',UsuariosController::class);
Route::put('password/{id}',[UsuariosController::class,'cambiarPassword']);
Route::post('register',[UsuariosController::class,'register']);





//clientes
Route::apiResource('clientes',ClientesController::class);
Route::put('cambioPassword/{id}',[ClientesController::class,'cambiarPasswordCliente']);
Route::post('loginCliente',[ClientesAuthController::class,'login']);



//productos
Route::apiResource('productos',ProductoController::class);


//categorias
Route::apiResource('categorias',CategoriaController::class);


















