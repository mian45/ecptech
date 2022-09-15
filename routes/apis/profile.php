<?php
use App\Http\Controllers\Api\UserController;

Route::post('edit-profile', [UserController::class, 'update']);
Route::post('change-password', [RegisterController::class, 'changePassword']);