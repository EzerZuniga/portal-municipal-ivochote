<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Megantoni Municipal API en funcionamiento.',
        'health' => url('/up'),
        'api_base' => url('/api'),
    ]);
});
