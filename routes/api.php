<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [RegisterController::class, 'login']);
Route::post('forgotPassword', [RegisterController::class, 'forgotPassword']);
Route::post('verifyCode', [RegisterController::class, 'verifyCode']);
Route::post('addRole', [RegisterController::class, 'addRole']);
Route::post('getStaff', [StaffController::class, 'getStaff']);
Route::post('editProfile', [UserController::class, 'edit_profile']);
Route::post('changePassword', [RegisterController::class, 'change_password']);

Route::middleware('auth:api')->group( function () {



});
