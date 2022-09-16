<?php
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RegisterController;

Route::post('edit-profile', [UserController::class, 'update']);
Route::post('change-password', [RegisterController::class, 'changePassword']);