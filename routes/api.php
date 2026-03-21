<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DocumentoController;
use App\Http\Controllers\TramiteController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Rutas de autenticación (públicas)
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
});

// Rutas protegidas con Sanctum
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me',      [AuthController::class, 'me']);
    });

    // Trámites
    Route::apiResource('tramites', TramiteController::class)->except(['update']);
    Route::patch('tramites/{tramite}/status', [TramiteController::class, 'updateStatus'])
        ->middleware('role:funcionario,admin');

    // Documentos por trámite
    Route::prefix('tramites/{tramite}/documentos')->group(function () {
        Route::get('/',  [DocumentoController::class, 'index']);
        Route::post('/', [DocumentoController::class, 'upload']);
    });

    // Documentos individuales
    Route::prefix('documentos/{documento}')->group(function () {
        Route::get('/download', [DocumentoController::class, 'download']);
        Route::delete('/',      [DocumentoController::class, 'destroy']);
    });

    // Usuarios (solo admin)
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('users', UserController::class)->except(['store']);
    });
});
