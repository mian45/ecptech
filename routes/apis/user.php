<?php

use App\Http\Controllers\Api\UserController;


Route::post('add-card', [UserController::class, 'addCard']);
Route::get('get-card', [UserController::class, 'getCard']);
