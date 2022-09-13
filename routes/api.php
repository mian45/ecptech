<?php

use App\Http\Controllers\Api\ReminderController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\StaffController;
use App\Http\Controllers\Api\DiscountController;
use App\Http\Controllers\Api\TaxController;
use App\Http\Controllers\Api\ShippingController;
use App\Http\Controllers\Api\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Client\SettingController;
use App\Http\Controllers\Api\PrescriptionController;
use App\Http\Controllers\Api\InvoicesController;
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

    Route::post('invoice-summmary', [DashboardController::class, 'getInvoiceSummmary']);
    Route::post('invoice-stats', [DashboardController::class, 'getInvoiceStats']);  
    Route::get('getDiscount', [DiscountController::class, 'getDiscount']);
    Route::post('addDiscount', [DiscountController::class, 'addDiscount']);
    Route::post('deleteDiscount', [DiscountController::class, 'deleteDiscount']);


    Route::get('getTaxes', [TaxController::class, 'getTaxes']);
    Route::post('addTax', [TaxController::class, 'addTax']);
    Route::post('editTax', [TaxController::class, 'editTax']);
    Route::post('deleteTax', [TaxController::class, 'deleteTax']);

    Route::get('getStates', [TaxController::class, 'getStates']);


    Route::get('getShipping', [ShippingController::class, 'getShipping']);
    Route::post('addShipping', [ShippingController::class, 'addShipping']);
    Route::post('deleteShipping', [ShippingController::class, 'deleteShipping']);

    Route::post('eyePrescriptions', [PrescriptionController::class, 'eye_prescriptions']);
    Route::post('eyePrescriptionsCalculator', [PrescriptionController::class, 'eye_prescriptions_calculator']);
    Route::post('editProfile', [UserController::class, 'edit_profile']);
    Route::post('changePassword', [RegisterController::class, 'change_password']);
    Route::get('get_invoices', [InvoicesController::class, 'index']);
    Route::post('search_invoices', [InvoicesController::class, 'search']);
});


