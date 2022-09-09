<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\Client\SettingController;
use App\Http\Controllers\Api\PrescriptionController;
use App\Http\Controllers\Api\InvoicesController;
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
Route::post('eyePrescriptions', [PrescriptionController::class, 'eye_prescriptions']);
Route::post('eyePrescriptionsCalculator', [PrescriptionController::class, 'eye_prescriptions_calculator']);
Route::get('get_invoices', [InvoicesController::class, 'index']);
Route::get('search_invoices', [InvoicesController::class, 'search']);





Route::middleware('auth:api')->group( function () {

    Route::post('updateStaffLogin', [RegisterController::class, 'updateStaffLogin']);
    Route::post('getStaff', [StaffController::class, 'getStaff']);
    Route::post('addStaff', [StaffController::class, 'addStaff']);
    Route::post('editStaff', [StaffController::class, 'editStaff']);

    Route::get('getReminders', [SettingController::class, 'getReminders']);
    Route::post('addReminder', [SettingController::class, 'addReminder']);
    Route::post('editReminder', [SettingController::class, 'editReminder']);
    Route::post('activeInactiveReminder', [SettingController::class, 'activeInactiveReminder']);
    Route::post('deleteReminder', [SettingController::class, 'deleteReminder']);
});
