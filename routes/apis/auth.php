<?php

use App\Http\Controllers\Api\RegisterController;


Route::post('logout', [RegisterController::class, 'logout']);

