<?php
use App\Http\Controllers\Api\UserController;

Route::post('editprofile', [UserController::class, 'edit_profile']);
Route::post('changepassword', [RegisterController::class, 'change_password']);