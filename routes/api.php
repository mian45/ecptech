<?php

use App\Http\Controllers\Api\ReminderController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\StaffController;
use App\Http\Controllers\Api\DashboardController;
use Illuminate\Support\Facades\Route;

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


Route::middleware('auth:api')->group( function () {

    Route::post('updateStaffLogin', [RegisterController::class, 'updateStaffLogin']);
    Route::post('getStaff', [StaffController::class, 'getStaff']);
    Route::post('addStaff', [StaffController::class, 'addStaff']);
    Route::post('editStaff', [StaffController::class, 'editStaff']);

    Route::get('getReminders', [ReminderController::class, 'getReminders']);
    Route::post('addReminder', [ReminderController::class, 'addReminder']);
    Route::post('editReminder', [ReminderController::class, 'editReminder']);
    Route::post('activeInactiveReminder', [ReminderController::class, 'activeInactiveReminder']);
    Route::post('deleteReminder', [ReminderController::class, 'deleteReminder']);

    Route::post('getInvoiceSummmary', [DashboardController::class, 'getInvoiceSummmary']);    
});
