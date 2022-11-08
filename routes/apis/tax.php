<?php

use App\Http\Controllers\Api\TaxController;


Route::get('get-taxes', [TaxController::class, 'getTaxes']);
Route::post('add-tax', [TaxController::class, 'addTax']);
Route::post('change-tax-status', [TaxController::class, 'changeTaxStatus']);
Route::post('edit-tax', [TaxController::class, 'editTax']);
Route::post('delete-tax', [TaxController::class, 'deleteTax']);
Route::get('get-states', [TaxController::class, 'getStates']);