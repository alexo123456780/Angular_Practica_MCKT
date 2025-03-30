<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categorias;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        try{

            $allCategories = Categorias::all();


            if($allCategories->isEmpty()){

                return response()->json([

                    'status' => 'true',
                    'message' => 'No hay Categorias Existententes Aun',
                    'data' => [],
                    'code' => 404

                ],404);

            }


            return response()->json([

                'status' => true,
                'message' => 'Se obtuvieron todas las categorias correctamente',
                'data' => $allCategories,
                'code' => 200
            ],200);


        }catch(\Exception $e){


            return response()->json([

                'status' => false,
                'message' => 'Ocurrio un error interno en la solicitud',
                'warning' => $e->getMessage(),
                'code' => 500

            ],500);

        }
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        try{

            $categoriaValidada = $request->validate([

                'nombre_categoria' => 'string|max:255|unique:categorias|required'

            ]);


            $nuevaCategoria = Categorias::create($categoriaValidada);


            return response()->json([

                'status' => 'true',
                'message' => 'Categoria creada exitosamente',
                'data' => $nuevaCategoria,
                'code' => 201

            ],201);


        }catch(\Illuminate\Validation\ValidationException $e){

            return response()->json([

                'status' => 'false',
                'message' => 'Ocurrio un error de validacion de datos',
                'warning' => $e->errors(),
                'code' => 400

            ],400);

        }catch(\Exception $e){

            return response()->json([

                'status' => 'false',
                'message' => 'Ocurrio un error interno en la solicitud',
                'warning' => $e->getMessage(),
                'code' => 500

            ],500);

        }

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {

        try{

            $categoriaEncontrada = Categorias::find($id);

            if(!$categoriaEncontrada){

                return response()->json([

                    'status' => false,
                    'message' => 'El id '.   $id.  ' no existe o no se encuentra en la base de datos',
                    'code' => 404

                ],404);
            }


            return response()->json([

                'status' => true,
                'message' => 'Categoria encontrada exitosamente',
                'data' => $categoriaEncontrada,
                'code' => 200

            ],200);


        }catch(\Exception $e){

            return response()->json([

                'status' => false,
                'message' => 'Ocurrio un error interno en la solicitud',
                'warning' => $e->getMessage(),
                'code' => 500

            ],500);

        }

        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
