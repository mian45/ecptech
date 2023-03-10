<?php

use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\ShippingController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Client\SettingController;
use App\Http\Controllers\Api\InvoicesController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProfitComparisonController;


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
Route::get('get-roles', [RegisterController::class, 'getRoles']);


Route::middleware('auth:api')->group( function () {

    includeRouteFiles(__DIR__ . '/apis/');

    Route::post('updateStaffLogin', [RegisterController::class, 'updateStaffLogin']);

    Route::get('get-shipping', [ShippingController::class, 'getShipping']);
    Route::post('add-shipping', [ShippingController::class, 'addShipping']);
    Route::post('delete-shipping', [ShippingController::class, 'deleteShipping']);

    Route::post('profit-comparison', [ProfitComparisonController::class, 'calculateProfitComparison']);
});


