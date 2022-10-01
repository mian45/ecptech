<?php

use App\Http\Controllers\Api\DiscountController;


Route::get('get-discount', [DiscountController::class, 'getDiscount']);
Route::post('add-discount', [DiscountController::class, 'addDiscount']);
Route::post('edit-discount', [DiscountController::class, 'EditDiscount']);
Route::post('delete-discount', [DiscountController::class, 'deleteDiscount']);

Route::post('discount-status', [DiscountController::class, 'changeStatus']);
